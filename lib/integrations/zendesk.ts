import axios from 'axios';

const client = axios.create({
  baseURL: 'https://your-domain.zendesk.com/api/v2',
  headers: {
    'Authorization': `Bearer ${process.env.ZENDESK_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export interface ZendeskTicket {
  id: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  requester_id: number;
}

export interface CreateTicketData {
  subject: string;
  comment: {
    body: string;
  };
  priority?: string;
  requester?: {
    email: string;
    name: string;
  };
}

export async function createTicket(ticketData: CreateTicketData): Promise<ZendeskTicket> {
  try {
    const response = await client.post('/tickets.json', {
      ticket: ticketData,
    });
    return response.data.ticket;
  } catch (error) {
    throw new Error(`Failed to create ticket: ${error}`);
  }
}

export async function getTickets(status?: string): Promise<ZendeskTicket[]> {
  try {
    const params = status ? { status } : {};
    const response = await client.get('/tickets.json', { params });
    return response.data.tickets;
  } catch (error) {
    throw new Error(`Failed to get tickets: ${error}`);
  }
}