const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

dotenv.config();

// --- KEEP YOUR SENDGRID INITIALIZATION HERE ---
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('✅ SendGrid initialized');
} else {
  console.log('⚠️ SendGrid API key not found');
}

const app = express();

// --- UPDATED CORS (Allows Vercel to talk to Backend) ---
const allowedOrigins = [
  'http://localhost:5173',
  'https://mahastar-medical-billing.vercel.app',
  /\.vercel\.app$/ 
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Supabase Clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Admin client with service role key (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Email transporter (optional - for sending notifications)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contact form endpoint - using supabaseAdmin to bypass RLS
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, practice, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, subject, and message are required' 
      });
    }

    // Save to Supabase using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from('contacts')
      .insert([
        { 
          name, 
          email, 
          phone: phone || null, 
          practice: practice || null, 
          subject, 
          message, 
          created_at: new Date(),
          status: 'pending'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Send email notification (optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: 'info@mahastar.com',
          subject: `New Contact Form: ${subject}`,
          html: `
            <h3>New Contact Request</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Practice:</strong> ${practice || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
            <hr />
            <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
          `,
        });
        console.log('Email notification sent');
      } catch (emailError) {
        console.error('Email error:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(200).json({ 
      success: true, 
      message: 'Contact saved successfully',
      data: data 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all contacts (protected - using admin client)
app.get('/api/contacts', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single contact by ID
app.get('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseAdmin
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update contact status
app.put('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;
    
    const { data, error } = await supabaseAdmin
      .from('contacts')
      .update({ 
        status: status, 
        response: response,
        responded_at: new Date() 
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Newsletter subscription
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email is required' 
      });
    }

    const { data, error } = await supabaseAdmin
      .from('newsletter')
      .insert([{ email, subscribed_at: new Date() }]);

    if (error) throw error;
    res.status(200).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// ============= BLOG POSTS ENDPOINTS =============

// Get all published blog posts
// Get all published blog posts (with category and tag filtering)
app.get('/api/blog/posts', async (req, res) => {
  try {
    const { category, tag } = req.query;
    
    console.log('Filtering - Category:', category, 'Tag:', tag); // Debug log
    
    let query = supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    // Apply category filter
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    let { data, error } = await query;
    if (error) throw error;
    
    // Apply tag filter if present
    if (tag && tag !== 'null' && tag !== 'undefined') {
      console.log('Filtering by tag:', tag);
      
      // First, get all post_tags with the tag name
      const { data: postTags, error: postTagsError } = await supabaseAdmin
        .from('post_tags')
        .select(`
          post_id,
          tags!inner (
            name
          )
        `);
      
      if (postTagsError) {
        console.error('Error fetching post_tags:', postTagsError);
        throw postTagsError;
      }
      
      // Get post IDs that have the matching tag
      const matchingPostIds = postTags
        .filter(pt => pt.tags && pt.tags.name === tag)
        .map(pt => pt.post_id);
      
      console.log('Posts with tag:', matchingPostIds);
      
      // Filter the data to only include posts with matching tags
      data = data.filter(post => matchingPostIds.includes(post.id));
    }
    
    console.log('Returning', data.length, 'posts');
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single blog post by slug
app.get('/api/blog/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    console.log('Looking for post with slug:', slug); // Debug log
    
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    if (!data) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    
    // Increment view count
    await supabaseAdmin
      .from('blog_posts')
      .update({ views: (data.views || 0) + 1 })
      .eq('id', data.id);
    
    // Get comments for this post
    const { data: comments, error: commentsError } = await supabaseAdmin
      .from('comments')
      .select('*')
      .eq('post_id', data.id)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
    
    res.status(200).json({ 
      success: true, 
      data: { ...data, comments: comments || [] }
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new blog post (admin only)
app.post('/api/blog/posts', async (req, res) => {
  try {
    const { title, slug, excerpt, content, author, category, image_url, read_time } = req.body;
    
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([{
        title, slug, excerpt, content, author, 
        category, image_url, read_time, 
        created_at: new Date(),
        status: 'published'
      }])
      .select();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update blog post
app.put('/api/blog/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    updates.updated_at = new Date();
    
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete blog post
app.delete('/api/blog/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.status(200).json({ success: true, message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// ============= TAGS ENDPOINTS =============

// Get all tags
app.get('/api/tags', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('tags')
      .select('*')
      .order('name');
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get tags for a specific post
app.get('/api/blog/posts/:postId/tags', async (req, res) => {
  try {
    const { postId } = req.params;
    const { data, error } = await supabaseAdmin
      .from('post_tags')
      .select('tags(*)')
      .eq('post_id', postId);
    
    if (error) throw error;
    const tags = data.map(item => item.tags);
    res.status(200).json({ success: true, data: tags });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add tags to a post
app.post('/api/blog/posts/:postId/tags', async (req, res) => {
  try {
    const { postId } = req.params;
    const { tagIds } = req.body;
    
    const tagInserts = tagIds.map(tagId => ({
      post_id: postId,
      tag_id: tagId
    }));
    
    const { data, error } = await supabaseAdmin
      .from('post_tags')
      .insert(tagInserts)
      .select();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// ============= COMMENTS ENDPOINTS =============

// IMPORTANT: Specific routes FIRST, then parameterized routes

// Get all comments (for admin) - SPECIFIC ROUTE FIRST
app.get('/api/blog/comments/all', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching all comments:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete comment
app.delete('/api/blog/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin
      .from('comments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.status(200).json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Approve comment
app.put('/api/blog/comments/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseAdmin
      .from('comments')
      .update({ is_approved: true })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error approving comment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add comment to post
app.post('/api/blog/comments', async (req, res) => {
  try {
    const { post_id, author_name, author_email, content } = req.body;
    
    const { data, error } = await supabaseAdmin
      .from('comments')
      .insert([{
        post_id,
        author_name,
        author_email,
        content,
        is_approved: false,
        created_at: new Date()
      }])
      .select();
    
    if (error) throw error;
    res.status(200).json({ success: true, message: 'Comment submitted for approval' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get comments for a post (parameterized route - MUST BE LAST)
app.get('/api/blog/comments/:post_id', async (req, res) => {
  try {
    const { post_id } = req.params;
    const { data, error } = await supabaseAdmin
      .from('comments')
      .select('*')
      .eq('post_id', post_id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// Get all subscribers (admin)
app.get('/api/newsletter', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('newsletter')
      .select('*')
      .order('subscribed_at', { ascending: false });
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete subscriber
app.delete('/api/newsletter/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin
      .from('newsletter')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.status(200).json({ success: true, message: 'Subscriber removed' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// Send newsletter to all subscribers
app.post('/api/newsletter/send', async (req, res) => {
  try {
    const { subject, content, subscribers } = req.body;
    
    if (!subscribers || subscribers.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No subscribers to send to' 
      });
    }
    
    if (!process.env.SENDGRID_API_KEY) {
      return res.status(400).json({ 
        success: false, 
        error: 'SendGrid API key not configured. Please add SENDGRID_API_KEY to .env' 
      });
    }
    
    console.log(`📧 Sending newsletter "${subject}" to ${subscribers.length} subscribers`);
    
    let successCount = 0;
    let failCount = 0;
    
    // Send individually for better tracking
    for (const subscriber of subscribers) {
      try {
        const msg = {
          to: subscriber,
          from: process.env.SENDGRID_FROM_EMAIL || 'info@mahastar.com',
          fromName: 'MahaStar Medical Billing',
          subject: subject,
          html: content,
          trackingSettings: {
            openTracking: { enable: true },
            clickTracking: { enable: true }
          }
        };
        
        await sgMail.send(msg);
        successCount++;
        console.log(`✅ Sent to ${subscriber}`);
      } catch (emailError) {
        failCount++;
        console.error(`❌ Failed to send to ${subscriber}:`, emailError.response?.body?.errors?.[0]?.message || emailError.message);
      }
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    res.status(200).json({ 
      success: true, 
      message: `Newsletter sent to ${successCount} subscribers (${failCount} failed)` 
    });
  } catch (error) {
    console.error('Error sending newsletter:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// Get posts by tag name
app.get('/api/blog/posts/tag/:tagName', async (req, res) => {
  try {
    const { tagName } = req.params;
    
    // Get all post_tags with this tag
    const { data: postTags, error: postTagsError } = await supabaseAdmin
      .from('post_tags')
      .select(`
        post_id,
        blog_posts!inner (*)
      `)
      .eq('tags.name', tagName);
    
    if (postTagsError) throw postTagsError;
    
    const posts = postTags.map(pt => pt.blog_posts);
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// Test SendGrid endpoint
app.get('/api/test-sendgrid', async (req, res) => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        error: 'SENDGRID_API_KEY not configured' 
      });
    }
    
    const testEmail = req.query.email || 'ahmedbutt1109@gmail.com'; // Replace with your email
    
    const msg = {
      to: testEmail,
      from: process.env.SENDGRID_FROM_EMAIL || 'ahmedbutt1109@gmail.com',
      subject: 'MahaStar SendGrid Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0A5C8E, #1E3A5F); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1>MahaStar</h1>
            <p>Medical Billing & IT Solutions</p>
          </div>
          <div style="padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #0A5C8E;">✅ Test Successful!</h2>
            <p>Your SendGrid integration is working correctly.</p>
            <p>You can now send newsletters to your subscribers.</p>
            <hr style="margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">This is a test email from MahaStar Medical Billing & IT Solutions LLC.</p>
          </div>
        </div>
      `
    };
    
    await sgMail.send(msg);
    res.json({ success: true, message: 'Test email sent! Check your inbox.' });
  } catch (error) {
    console.error('SendGrid Error Details:', error.response?.body || error.message);
    res.status(500).json({ 
      success: false, 
      error: error.response?.body?.errors?.[0]?.message || error.message 
    });
  }
});
// A simple health check to test if the backend is alive
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Also add a "root" check just in case
app.get('/', (req, res) => {
  res.send('MahaStar Server is Live');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Local Server running on port ${PORT}`);
  });
}

// CRITICAL: This is what Vercel needs to run your code
module.exports = app;