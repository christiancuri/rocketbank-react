import { PaginationOptions } from 'src/utils';

import { getModule, postModule, deleteModule, putModule } from '../client';
import {
  Client,
  CreateClientPayload,
  UpdateClientPayload
} from './clients.types';

export async function getAllClients(skip = 0, limit = PaginationOptions.limit) {
  return getModule<{
    clients: Client[];
    pages: number;
    totalClients: number;
  }>(`/client?skip=${skip}&limit=${limit}`);
}

export async function createClient(client: CreateClientPayload) {
  return postModule<Client>('/client', client);
}

export async function updateClient(client: UpdateClientPayload) {
  return putModule<Client>(`/client/${client._id}`, client);
}

export async function deleteClient(id: Client['_id']) {
  return deleteModule<Client>(`/client/${id}`);
}

export * as ClientsRequests from './index';
