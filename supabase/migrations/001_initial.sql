BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'client', 'reviewer')),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX users_email_idx ON users(email);
CREATE INDEX users_created_at_idx ON users(created_at);

-- Create businesses table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  description TEXT,
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX businesses_user_id_idx ON businesses(user_id);
CREATE INDEX businesses_created_at_idx ON businesses(created_at);

-- Create business_users table
CREATE TABLE business_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'reviewer', 'viewer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX business_users_business_user_idx ON business_users(business_id, user_id);
CREATE INDEX business_users_user_id_idx ON business_users(user_id);
CREATE INDEX business_users_created_at_idx ON business_users(created_at);

-- Create platform_integrations table
CREATE TABLE platform_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('google_my_business', 'facebook', 'gmail', 'zendesk', 'hubspot')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'active', 'error', 'disabled')),
  credentials JSONB NOT NULL DEFAULT '{}',
  settings JSONB NOT NULL DEFAULT '{}',
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX platform_integrations_business_platform_idx ON platform_integrations(business_id, platform);
CREATE INDEX platform_integrations_platform_idx ON platform_integrations(platform);
CREATE INDEX platform_integrations_status_idx ON platform_integrations(status);
CREATE INDEX platform_integrations_created_at_idx ON platform_integrations(created_at);

-- Create response_templates table
CREATE TABLE response_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  rating_tier TEXT NOT NULL CHECK (rating_tier IN ('1-2_star', '3_star', '4-5_star')),
  name TEXT NOT NULL,
  template_content TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_default BOOLEAN NOT NULL DEFAULT false,
  usage_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX response_templates_business_rating_idx ON response_templates(business_id, rating_tier);
CREATE INDEX response_templates_business_default_idx ON response_templates(business_id, is_default);
CREATE INDEX response_templates_created_at_idx ON response_templates(created_at);

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  platform_integration_id UUID NOT NULL REFERENCES platform_integrations(id) ON DELETE CASCADE,
  platform_review_id TEXT NOT NULL,
  reviewer_name TEXT,
  reviewer_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  review_date TIMESTAMPTZ NOT NULL,
  response_status TEXT NOT NULL CHECK (response_status IN ('pending', 'generated', 'sent', 'failed', 'skipped')),
  sentiment_score DECIMAL,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX reviews_platform_review_idx ON reviews(platform_integration_id, platform_review_id);
CREATE INDEX reviews_business_date_idx ON reviews(business_id, review_date);
CREATE INDEX reviews_response_status_idx ON reviews(response_status);
CREATE INDEX reviews_rating_idx ON reviews(rating);
CREATE INDEX reviews_created_at_idx ON reviews(created_at);

-- Create review_responses table
CREATE TABLE review_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  template_id UUID REFERENCES response_templates(id) ON DELETE SET NULL,
  response_text TEXT NOT NULL,
  generation_method TEXT NOT NULL CHECK (generation_method IN ('ai_generated', 'template', 'manual')),
  status TEXT NOT NULL CHECK (status IN ('draft', 'approved', 'sent', 'failed')),
  sent_at TIMESTAMPTZ,
  platform_response_id TEXT,
  error_message TEXT,
  approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX review_responses_review_id_idx ON review_responses(review_id);
CREATE INDEX review_responses_status_idx ON review_responses(status);
CREATE INDEX review_responses_sent_at_idx ON review_responses(sent_at);
CREATE INDEX review_responses_created_at_idx ON review_responses(created_at);

-- Create follow_up_tasks table
CREATE TABLE follow_up_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  task_type TEXT NOT NULL CHECK (task_type IN ('email_followup', 'sms_followup', 'call_reminder')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'cancelled', 'failed')),
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT,
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX follow_up_tasks_review_id_idx ON follow_up_tasks(review_id);
CREATE INDEX follow_up_tasks_scheduled_at_idx ON follow_up_tasks(scheduled_at);
CREATE INDEX follow_up_tasks_status_idx ON follow_up_tasks(status);
CREATE INDEX follow_up_tasks_assigned_to_idx ON follow_up_tasks(assigned_to);
CREATE INDEX follow_up_tasks_created_at_idx ON follow_up_tasks(created_at);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_up_tasks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "owner_all" ON users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON businesses FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON business_users FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON platform_integrations FOR ALL USING (
  auth.uid() IN (
    SELECT user_id FROM businesses WHERE id = business_id
  )
) WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM businesses WHERE id = business_id
  )
);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON response_templates FOR ALL USING (
  auth.uid() IN (
    SELECT user_id FROM businesses WHERE id = business_id
  )
) WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM businesses WHERE id = business_id
  )
);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON reviews FOR ALL USING (
  auth.uid() IN (
    SELECT user_id FROM businesses WHERE id = business_id
  )
) WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM businesses WHERE id = business_id
  )
);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON review_responses FOR ALL USING (
  auth.uid() IN (
    SELECT b.user_id FROM businesses b 
    JOIN reviews r ON r.business_id = b.id 
    WHERE r.id = review_id
  )
) WITH CHECK (
  auth.uid() IN (
    SELECT b.user_id FROM businesses b 
    JOIN reviews r ON r.business_id = b.id 
    WHERE r.id = review_id
  )
);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON follow_up_tasks FOR ALL USING (
  auth.uid() IN (
    SELECT b.user_id FROM businesses b 
    JOIN reviews r ON r.business_id = b.id 
    WHERE r.id = review_id
  )
) WITH CHECK (
  auth.uid() IN (
    SELECT b.user_id FROM businesses b 
    JOIN reviews r ON r.business_id = b.id 
    WHERE r.id = review_id
  )
);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

COMMIT;