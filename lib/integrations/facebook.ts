import { FacebookApi } from 'facebook-api-client';

const client = new FacebookApi({
  accessToken: process.env.FACEBOOK_API_KEY,
});

export interface FacebookPost {
  id: string;
  message: string;
  created_time: string;
  from: {
    id: string;
    name: string;
  };
}

export interface FacebookComment {
  id: string;
  message: string;
  created_time: string;
  from: {
    id: string;
    name: string;
  };
}

export async function getPagePosts(pageId: string): Promise<FacebookPost[]> {
  try {
    const response = await client.get(`/${pageId}/posts`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error}`);
  }
}

export async function replyToComment(commentId: string, message: string): Promise<FacebookComment> {
  try {
    const response = await client.post(`/${commentId}/comments`, { message });
    return response;
  } catch (error) {
    throw new Error(`Failed to reply to comment: ${error}`);
  }
}