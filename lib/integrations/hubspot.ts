import { Client } from '@hubspot/api-client';

const client = new Client({
  accessToken: process.env.HUBSPOT_API_KEY,
});

export interface HubSpotContact {
  id: string;
  properties: {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactData {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  company?: string;
}

export async function createContact(contactData: CreateContactData): Promise<HubSpotContact> {
  try {
    const response = await client.crm.contacts.basicApi.create({
      properties: contactData,
    });
    return response as HubSpotContact;
  } catch (error) {
    throw new Error(`Failed to create contact: ${error}`);
  }
}

export async function getContacts(limit: number = 20): Promise<HubSpotContact[]> {
  try {
    const response = await client.crm.contacts.basicApi.getPage(
      limit,
      undefined,
      ['firstname', 'lastname', 'email', 'phone', 'company']
    );
    return response.results as HubSpotContact[];
  } catch (error) {
    throw new Error(`Failed to get contacts: ${error}`);
  }
}