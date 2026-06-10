import type { Request, Response } from 'express';
import { db } from '@rmp/shared-core';
import { mapClientModelToDBModel, mapDBModelToClientModel } from '@rmp/shared-util';
import { RMPClientModel } from '@rmp/shared-models';

export const getClients = async (req: Request, res: Response) => {
    try {
        const clients = await db('clients').select('*') || [];
        const clientData = clients.map((client: RMPClientModel) => mapDBModelToClientModel(client));   
        res.status(200).json(clientData);
    }catch(err){
        res.status(500).json(err)
    }
    
};

export const createClient = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const dbPayload = mapClientModelToDBModel(payload)
        await db('clients').insert(dbPayload);
        res.status(201).json();  
    }catch(err){
        res.status(500).json(err);
    }

};
