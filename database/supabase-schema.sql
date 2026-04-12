-- Create contacts table
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  practice VARCHAR(255),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending'
);

-- Create newsletter subscribers table
CREATE TABLE newsletter (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW()
);

-- Create inquiries table for tracking
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  contact_id INTEGER REFERENCES contacts(id),
  response TEXT,
  responded_at TIMESTAMP,
  responded_by VARCHAR(100)
);

-- Add indexes for better performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);
CREATE INDEX idx_newsletter_email ON newsletter(email);