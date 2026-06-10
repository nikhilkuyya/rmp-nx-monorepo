import type { Request, Response } from 'express';
import { db } from '@rmp/shared-core';
import { mapClientModelToDBModel, mapDBModelToClientModel } from '@rmp/shared-util';
import { RMPClientModel } from '@rmp/shared-models';

export const getClients = async (req: Request, res: Response) => {
    const clients = await db('clients').select('*') || [];
    return clients.map((client: RMPClientModel) => mapDBModelToClientModel(client));   
};

export const createClient = async (req: Request, res: Response) => {
    const payload = req.body;
    const dbPayload = mapClientModelToDBModel(payload)
    await db('clients').insert(dbPayload);
};
