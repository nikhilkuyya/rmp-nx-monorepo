import type { Request, Response } from 'express';
import { db } from '@rmp/shared-core';

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
    await db('clients').insert({});
  } catch (err) {
    console.error('error', err);
  }
};
