import type { Request, Response } from 'express';
import { db } from '@rmp/shared-core';
import { mapClientModelToDBModel } from '@rmp/shared-util';
import { clientService } from '../services/client.service';
import * as v from 'valibot';

export const getClients = async (req: Request, res: Response) => {
  const { name } = req.query;
  if (name) {
    return getClientByName(req, res);
  } else {
    return getClientsNoFilter(req, res);
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const dbPayload = mapClientModelToDBModel(payload);
    await db('clients').insert(dbPayload);
    res.status(201).json();
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getClientByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const nameParser = v.safeParse(v.string(), name);
    if (nameParser.success) {
      const validName = nameParser.output;
      const clientData = await clientService.getClientByName(validName);
      return res.status(200).json(clientData);
    } else {
      return res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getClientsNoFilter = async (req: Request, res: Response) => {
  try {
    const clients = await clientService.getClients();
    return res.status(200).json(clients);
  } catch (err) {
    return res.status(500).json(err);
  }
};
