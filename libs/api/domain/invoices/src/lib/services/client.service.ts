import { RMPClientModel } from '@rmp/shared-models';
import { db } from '@rmp/shared-core';
import { mapDBModelToClientModel } from '@rmp/shared-util';

const getClientByName = async (name: string) => {
  const clients =
    (await db('clients').select('*').where('company_name', 'like', `%${name}%`)) || [];
  const clientData = clients.map((client: RMPClientModel) => mapDBModelToClientModel(client));
  return clientData;
};

const getClients = async (limit : number = 10) => {
  const clients = await db('clients').select('*').limit(limit);
  const clientData = clients.map((client: RMPClientModel) => mapDBModelToClientModel(client));
  return clientData;
}

export const clientService = {
  getClientByName,
  getClients
};
