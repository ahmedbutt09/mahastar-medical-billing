const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

dotenv.config();

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const app = express();

// --- CORS CONFIGURATION ---
const allowedOrigins = [
  'http://localhost:5173',
  'https://mahastar-medical-billing.vercel.app', // Your frontend URL
  /\.vercel\.app$/                               // Allows preview links
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
// Health check for Vercel testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Backend is live' });
});

// Only start the server if running locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
// ============= CHAT CALLBACK ENDPOINTS =============

// Submit chat callback request
app.post('/api/chat/callback', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }
    
    const { data, error } = await supabaseAdmin
      .from('chat_callbacks')
      .insert([{ name, email, phone, message, status: 'pending', created_at: new Date() }])
      .select();
    
    if (error) throw error;
    
    // Send email notification
    if (process.env.SENDGRID_API_KEY) {
      try {
        const msg = {
          to: 'support@mahastar.com',
          from: process.env.SENDGRID_FROM_EMAIL || 'info@mahastar.com',
          subject: 'New Chat Callback Request',
          html: `<h3>New Chat Callback Request</h3>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                 <p><strong>Message:</strong> ${message || 'Not provided'}</p>
                 <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>`
        };
        await sgMail.send(msg);
      } catch (emailError) {
        console.error('Email notification error:', emailError);
      }
    }
    
    res.status(200).json({ success: true, message: 'Callback request submitted' });
  } catch (error) {
    console.error('Chat callback error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all chat callbacks (admin)
app.get('/api/chat/callbacks', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('chat_callbacks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update chat callback status
app.put('/api/chat/callbacks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const { data, error } = await supabaseAdmin
      .from('chat_callbacks')
      .update({ status, updated_at: new Date() })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= CASE STUDIES ENDPOINTS =============

// Get all case studies
app.get('/api/case-studies', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('case_studies')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single case study by ID
app.get('/api/case-studies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseAdmin
      .from('case_studies')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create case study (admin)
app.post('/api/case-studies', async (req, res) => {
  try {
    const { title, specialty, challenge, solution, results, quote, author, image_url } = req.body;
    
    const { data, error } = await supabaseAdmin
      .from('case_studies')
      .insert([{ 
        title, 
        specialty, 
        challenge, 
        solution, 
        results: results || [], 
        quote, 
        author, 
        image_url, 
        status: 'published',
        created_at: new Date() 
      }])
      .select();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete case study (admin)
app.delete('/api/case-studies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin
      .from('case_studies')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.status(200).json({ success: true, message: 'Case study deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= SPECIALTIES ENDPOINTS =============

// Get all specialties
app.get('/api/specialties', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('specialties')
      .select('*')
      .eq('status', 'active')
      .order('name');
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single specialty by slug
app.get('/api/specialties/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { data, error } = await supabaseAdmin
      .from('specialties')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create specialty (admin)
app.post('/api/specialties', async (req, res) => {
  try {
    const { name, slug, description, icon, recovery_rate, avg_claim_value, providers_served } = req.body;
    
    const { data, error } = await supabaseAdmin
      .from('specialties')
      .insert([{ name, slug, description, icon, recovery_rate, avg_claim_value, providers_served, status: 'active' }])
      .select();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= EHR INTEGRATIONS ENDPOINTS =============

// Get all EHR integrations
app.get('/api/ehr-integrations', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('ehr_integrations')
      .select('*')
      .eq('status', 'active')
      .order('name');
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single EHR integration by slug
app.get('/api/ehr-integrations/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { data, error } = await supabaseAdmin
      .from('ehr_integrations')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= PAYERS ENDPOINTS =============

// Get all payers
app.get('/api/payers', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('payers')
      .select('*')
      .eq('status', 'active')
      .order('name');
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single payer by slug
app.get('/api/payers/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { data, error } = await supabaseAdmin
      .from('payers')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= AI SOLUTIONS ENDPOINTS =============

// Get all AI solutions
app.get('/api/ai-solutions', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('ai_solutions')
      .select('*')
      .eq('status', 'active')
      .order('name');
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single AI solution by slug
app.get('/api/ai-solutions/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { data, error } = await supabaseAdmin
      .from('ai_solutions')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= RCM SOFTWARE ENDPOINTS =============

// Get all RCM software
app.get('/api/rcm-software', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('rcm_software')
      .select('*')
      .eq('status', 'active')
      .order('name');
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single RCM software by slug
app.get('/api/rcm-software/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { data, error } = await supabaseAdmin
      .from('rcm_software')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= EVENTS ENDPOINTS =============

// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get upcoming events only
app.get('/api/events/upcoming', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .eq('status', 'upcoming')
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date', { ascending: true });
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create event (admin)
app.post('/api/events', async (req, res) => {
  try {
    const { title, date, location, type, description, registration_link } = req.body;
    
    const { data, error } = await supabaseAdmin
      .from('events')
      .insert([{ title, date, location, type, description, registration_link, status: 'upcoming' }])
      .select();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= MAGAZINE ISSUES ENDPOINTS =============

// Get all magazine issues
app.get('/api/magazine', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('magazine_issues')
      .select('*')
      .eq('status', 'published')
      .order('published_date', { ascending: false });
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single magazine issue
app.get('/api/magazine/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseAdmin
      .from('magazine_issues')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= PAGE VIEW ANALYTICS =============

// Track page view
app.post('/api/page-view', async (req, res) => {
  try {
    const { page_url, visitor_ip, user_agent } = req.body;
    
    await supabaseAdmin
      .from('page_views')
      .insert([{ page_url, visitor_ip, user_agent, viewed_at: new Date() }]);
    
    res.status(200).json({ success: true });
  } catch (error) {
    // Don't fail if analytics fails
    console.error('Page view tracking error:', error);
    res.status(200).json({ success: true });
  }
});

// Get page view stats (admin only - should add auth check)
app.get('/api/analytics/page-views', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('page_views')
      .select('*')
      .order('viewed_at', { ascending: false })
      .limit(5000);
    
    if (error) throw error;
    
    // Aggregate stats
    const totalViews = data.length;
    const uniquePages = [...new Set(data.map(v => v.page_url || 'home'))];
    const viewsByPage = {};
    const viewsByDay = {};
    
    data.forEach(v => {
      const page = v.page_url || 'home';
      viewsByPage[page] = (viewsByPage[page] || 0) + 1;
      
      const day = v.viewed_at?.split('T')[0];
      if (day) {
        viewsByDay[day] = (viewsByDay[day] || 0) + 1;
      }
    });
    
    res.status(200).json({ 
      success: true, 
      totalViews, 
      uniquePages: uniquePages.length,
      viewsByPage,
      viewsByDay,
      recentViews: data.slice(0, 100)
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= NEWSLETTER SEND (Enhanced) =============

// Get newsletter subscribers with pagination
app.get('/api/newsletter/subscribers', async (req, res) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const offset = (page - 1) * limit;
    
    const { data, error, count } = await supabaseAdmin
      .from('newsletter')
      .select('*', { count: 'exact' })
      .order('subscribed_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    res.status(200).json({ success: true, data, total: count, page, limit });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Bulk delete subscribers
app.delete('/api/newsletter/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !ids.length) {
      return res.status(400).json({ success: false, error: 'No IDs provided' });
    }
    
    const { error } = await supabaseAdmin
      .from('newsletter')
      .delete()
      .in('id', ids);
    
    if (error) throw error;
    res.status(200).json({ success: true, message: `${ids.length} subscribers removed` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= DASHBOARD STATS (Admin) =============

// Get comprehensive dashboard stats
app.get('/api/admin/stats', async (req, res) => {
  try {
    // Get counts from various tables
    const [
      contactsCount,
      pendingContactsCount,
      subscribersCount,
      chatCallbacksCount,
      pendingChatCallbacksCount,
      caseStudiesCount,
      specialtiesCount,
      eventsCount,
      pageViewsCount
    ] = await Promise.all([
      supabaseAdmin.from('contacts').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabaseAdmin.from('newsletter').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('chat_callbacks').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('chat_callbacks').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabaseAdmin.from('case_studies').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('specialties').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      supabaseAdmin.from('events').select('*', { count: 'exact', head: true }).eq('status', 'upcoming'),
      supabaseAdmin.from('page_views').select('*', { count: 'exact', head: true })
    ]);
    
    res.status(200).json({
      success: true,
      stats: {
        totalContacts: contactsCount.count || 0,
        pendingContacts: pendingContactsCount.count || 0,
        totalSubscribers: subscribersCount.count || 0,
        totalChatCallbacks: chatCallbacksCount.count || 0,
        pendingChatCallbacks: pendingChatCallbacksCount.count || 0,
        totalCaseStudies: caseStudiesCount.count || 0,
        activeSpecialties: specialtiesCount.count || 0,
        upcomingEvents: eventsCount.count || 0,
        totalPageViews: pageViewsCount.count || 0
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// CRITICAL: Export for Vercel
module.exports = app;