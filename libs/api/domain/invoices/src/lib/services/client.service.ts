import { RMPClient, RMPClientModel, RMPCreateClientPaylod } from '@rmp/shared-models';
import { db } from '@rmp/shared-core';
import { mapClientCreateModelToDBModel, mapClientDBModelToUIModel, mapClientUIModelToDBModel } from '@rmp/shared-util';

const getClientByName = async (name: string) => {
  const clients =
    (await db('clients').select('*').where('company_name', 'like', `%${name}%`)) || [];
  const clientData = clients.map((client: RMPClientModel) => mapClientDBModelToUIModel(client));
  return clientData;
};

const getClients = async (limit : number = 10) => {
  const clients = await db('clients').select('*').limit(limit);
  const clientData = clients.map((client: RMPClientModel) => mapClientDBModelToUIModel(client));
  return clientData;
}

const createClient = async (payload: RMPCreateClientPaylod) => {
  const createClientdbPayload = mapClientCreateModelToDBModel(payload);
  await db('clients').insert(createClientdbPayload);
}

const updateClient = async (payload: RMPClient) => {
  const updateClientdbPayload = mapClientUIModelToDBModel(payload);
  const { id, updated_at, ...rest} = updateClientdbPayload;
  await db('clients').update(rest).where('id','=',updateClientdbPayload.id || '');
}

const getClientById = async (id: string) => {
  const client = await db('clients').select('*').where('id', '=',id).first();
  if(client) {
    return mapClientDBModelToUIModel(client);
  }else {
    return null;
  }
}

export const clientService = {
  getClientByName,
  getClients,
  createClient,
  updateClient,
  getClientById
};
