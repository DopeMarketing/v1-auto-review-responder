import { supabase } from '@/lib/supabase';
import type {
  User,
  Business,
  BusinessUser,
  PlatformIntegration,
  ResponseTemplate,
  Review,
  ReviewResponse,
  FollowUpTask
} from '@/types';

// Users
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, role, name, created_at, updated_at')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data || [];
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, role, name, created_at, updated_at')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch user: ${error.message}`);
  return data;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select('id, email, role, name, created_at, updated_at')
    .single();
  
  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'created_at'>>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, email, role, name, created_at, updated_at')
    .single();
  
  if (error) throw new Error(`Failed to update user: ${error.message}`);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete user: ${error.message}`);
}

// Businesses
export async function getAllBusinesses(): Promise<Business[]> {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch businesses: ${error.message}`);
  return data || [];
}

export async function getBusinessById(id: string): Promise<Business | null> {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch business: ${error.message}`);
  return data;
}

export async function createBusiness(business: Omit<Business, 'id' | 'created_at' | 'updated_at'>): Promise<Business> {
  const { data, error } = await supabase
    .from('businesses')
    .insert(business)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to create business: ${error.message}`);
  return data;
}

export async function updateBusiness(id: string, updates: Partial<Omit<Business, 'id' | 'created_at'>>): Promise<Business> {
  const { data, error } = await supabase
    .from('businesses')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to update business: ${error.message}`);
  return data;
}

export async function deleteBusiness(id: string): Promise<void> {
  const { error } = await supabase
    .from('businesses')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete business: ${error.message}`);
}

// Platform Integrations
export async function getAllPlatformIntegrations(): Promise<PlatformIntegration[]> {
  const { data, error } = await supabase
    .from('platform_integrations')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch platform integrations: ${error.message}`);
  return data || [];
}

export async function getPlatformIntegrationById(id: string): Promise<PlatformIntegration | null> {
  const { data, error } = await supabase
    .from('platform_integrations')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch platform integration: ${error.message}`);
  return data;
}

export async function createPlatformIntegration(integration: Omit<PlatformIntegration, 'id' | 'created_at' | 'updated_at'>): Promise<PlatformIntegration> {
  const { data, error } = await supabase
    .from('platform_integrations')
    .insert(integration)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to create platform integration: ${error.message}`);
  return data;
}

export async function updatePlatformIntegration(id: string, updates: Partial<Omit<PlatformIntegration, 'id' | 'created_at'>>): Promise<PlatformIntegration> {
  const { data, error } = await supabase
    .from('platform_integrations')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to update platform integration: ${error.message}`);
  return data;
}

export async function deletePlatformIntegration(id: string): Promise<void> {
  const { error } = await supabase
    .from('platform_integrations')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete platform integration: ${error.message}`);
}

// Response Templates
export async function getAllResponseTemplates(): Promise<ResponseTemplate[]> {
  const { data, error } = await supabase
    .from('response_templates')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch response templates: ${error.message}`);
  return data || [];
}

export async function getResponseTemplateById(id: string): Promise<ResponseTemplate | null> {
  const { data, error } = await supabase
    .from('response_templates')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch response template: ${error.message}`);
  return data;
}

export async function createResponseTemplate(template: Omit<ResponseTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<ResponseTemplate> {
  const { data, error } = await supabase
    .from('response_templates')
    .insert(template)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to create response template: ${error.message}`);
  return data;
}

export async function updateResponseTemplate(id: string, updates: Partial<Omit<ResponseTemplate, 'id' | 'created_at'>>): Promise<ResponseTemplate> {
  const { data, error } = await supabase
    .from('response_templates')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to update response template: ${error.message}`);
  return data;
}

export async function deleteResponseTemplate(id: string): Promise<void> {
  const { error } = await supabase
    .from('response_templates')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete response template: ${error.message}`);
}

// Reviews
export async function getAllReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('review_date', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch reviews: ${error.message}`);
  return data || [];
}

export async function getReviewById(id: string): Promise<Review | null> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch review: ${error.message}`);
  return data;
}

export async function createReview(review: Omit<Review, 'id' | 'created_at' | 'updated_at'>): Promise<Review> {
  const { data, error } = await supabase
    .from('reviews')
    .insert(review)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to create review: ${error.message}`);
  return data;
}

export async function updateReview(id: string, updates: Partial<Omit<Review, 'id' | 'created_at'>>): Promise<Review> {
  const { data, error } = await supabase
    .from('reviews')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to update review: ${error.message}`);
  return data;
}

export async function deleteReview(id: string): Promise<void> {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete review: ${error.message}`);
}

// Review Responses
export async function getAllReviewResponses(): Promise<ReviewResponse[]> {
  const { data, error } = await supabase
    .from('review_responses')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch review responses: ${error.message}`);
  return data || [];
}

export async function getReviewResponseById(id: string): Promise<ReviewResponse | null> {
  const { data, error } = await supabase
    .from('review_responses')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch review response: ${error.message}`);
  return data;
}

export async function createReviewResponse(response: Omit<ReviewResponse, 'id' | 'created_at' | 'updated_at'>): Promise<ReviewResponse> {
  const { data, error } = await supabase
    .from('review_responses')
    .insert(response)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to create review response: ${error.message}`);
  return data;
}

export async function updateReviewResponse(id: string, updates: Partial<Omit<ReviewResponse, 'id' | 'created_at'>>): Promise<ReviewResponse> {
  const { data, error } = await supabase
    .from('review_responses')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to update review response: ${error.message}`);
  return data;
}

export async function deleteReviewResponse(id: string): Promise<void> {
  const { error } = await supabase
    .from('review_responses')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete review response: ${error.message}`);
}

// Follow Up Tasks
export async function getAllFollowUpTasks(): Promise<FollowUpTask[]> {
  const { data, error } = await supabase
    .from('follow_up_tasks')
    .select('*')
    .order('scheduled_at', { ascending: true });
  
  if (error) throw new Error(`Failed to fetch follow up tasks: ${error.message}`);
  return data || [];
}

export async function getFollowUpTaskById(id: string): Promise<FollowUpTask | null> {
  const { data, error } = await supabase
    .from('follow_up_tasks')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch follow up task: ${error.message}`);
  return data;
}

export async function createFollowUpTask(task: Omit<FollowUpTask, 'id' | 'created_at' | 'updated_at'>): Promise<FollowUpTask> {
  const { data, error } = await supabase
    .from('follow_up_tasks')
    .insert(task)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to create follow up task: ${error.message}`);
  return data;
}

export async function updateFollowUpTask(id: string, updates: Partial<Omit<FollowUpTask, 'id' | 'created_at'>>): Promise<FollowUpTask> {
  const { data, error } = await supabase
    .from('follow_up_tasks')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();
  
  if (error) throw new Error(`Failed to update follow up task: ${error.message}`);
  return data;
}

export async function deleteFollowUpTask(id: string): Promise<void> {
  const { error } = await supabase
    .from('follow_up_tasks')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete follow up task: ${error.message}`);
}