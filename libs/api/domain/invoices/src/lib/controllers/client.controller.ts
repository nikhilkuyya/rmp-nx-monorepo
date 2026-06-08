import type { Request, Response } from 'express';
import { db } from '@rmp/shared-core';

export const getClients = async (req: Request, res: Response) => {
    try { 
        const clients = await db('clients').select('*');
        return clients
    }catch(err){
        console.error('errr', JSON.stringify(err,null,2));
    }finally {
        console.log('get clients completed')
    }
}