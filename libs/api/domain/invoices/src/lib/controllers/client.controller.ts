import type { Request, Response } from 'express';
import { clientService } from '../services/client.service';

const getClients = async (req: Request, res: Response) => {
  const { name } = req.query;
  if (name) {
    return getClientByName(req, res);
  } else {
    return getClientsNoFilter(req, res);
  }
};

const createClient = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    await clientService.createClient(payload);
    res.status(201).json();
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateClient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const dbClient = await clientService.getClientById(id);
    const newClientPaylod = {
      ...dbClient,
      ...payload
    }
    await clientService.updateClient(newClientPaylod);
    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
};

const getClientById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const client = await clientService.getClientById(id);
    res.status(200).json(client);
  }catch(err){
    res.status(500).json(err);
  }
}

const getClientByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    if (name && typeof name === 'string') {
      const clientData = await clientService.getClientByName(name);
      return res.status(200).json(clientData);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getClientsNoFilter = async (req: Request, res: Response) => {
  try {
    const clients = await clientService.getClients();
    return res.status(200).json(clients);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const clientController =  {
  getClientById,
  updateClient,
  createClient,
  getClients
}

