export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: 'owner' | 'client' | 'reviewer';
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Business {
  id: string;
  user_id: string;
  name: string;
  industry: string | null;
  description: string | null;
  settings: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface BusinessUser {
  id: string;
  business_id: string;
  user_id: string;
  role: 'admin' | 'reviewer' | 'viewer';
  created_at: Date;
}

export interface PlatformIntegration {
  id: string;
  business_id: string;
  platform: 'google_my_business' | 'facebook' | 'gmail' | 'zendesk' | 'hubspot';
  status: 'pending' | 'active' | 'error' | 'disabled';
  credentials: Record<string, any>;
  settings: Record<string, any>;
  last_sync_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ResponseTemplate {
  id: string;
  business_id: string;
  rating_tier: '1-2_star' | '3_star' | '4-5_star';
  name: string;
  template_content: string;
  is_active: boolean;
  is_default: boolean;
  usage_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface Review {
  id: string;
  business_id: string;
  platform_integration_id: string;
  platform_review_id: string;
  reviewer_name: string | null;
  reviewer_email: string | null;
  rating: number;
  review_text: string | null;
  review_date: Date;
  response_status: 'pending' | 'generated' | 'sent' | 'failed' | 'skipped';
  sentiment_score: number | null;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface ReviewResponse {
  id: string;
  review_id: string;
  template_id: string | null;
  response_text: string;
  generation_method: 'ai_generated' | 'template' | 'manual';
  status: 'draft' | 'approved' | 'sent' | 'failed';
  sent_at: Date | null;
  platform_response_id: string | null;
  error_message: string | null;
  approved_by: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface FollowUpTask {
  id: string;
  review_id: string;
  task_type: 'email_followup' | 'sms_followup' | 'call_reminder';
  scheduled_at: Date;
  status: 'pending' | 'completed' | 'cancelled' | 'failed';
  assigned_to: string | null;
  notes: string | null;
  completed_at: Date | null;
  completed_by: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Database {
  users: User;
  businesses: Business;
  business_users: BusinessUser;
  platform_integrations: PlatformIntegration;
  response_templates: ResponseTemplate;
  reviews: Review;
  review_responses: ReviewResponse;
  follow_up_tasks: FollowUpTask;
}