import type { Request, Response } from 'express';
import { db } from '@rmp/shared-core';
import { clientModelToDBMapper } from '@rmp/shared-util';

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await db('clients').select('*');
    return clients;
  } catch (err) {
    console.error('error', err);
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const dbPayload= clientModelToDBMapper(payload)
    await db('clients').insert(dbPayload);
  } catch (err) {
    console.error('error', err);
  }
};
