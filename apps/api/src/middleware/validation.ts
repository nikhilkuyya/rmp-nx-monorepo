
import type { Request, Response, NextFunction } from 'express';
import * as v from 'valibot'

export const validationBody = (schema: v.GenericSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = v.safeParse(schema, req.body);
            if (result.success) {
                req.body = result.output;
                next();
            } else {
                res.status(400).json({ error:'validation failed', details: result.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })) });
                return;
            }
        } catch (err) {
            next(err);
        }
    }
}

export const validationParams = (schema: v.GenericSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = v.safeParse(schema, req.params);
            if (result.success) {                
                next();
            } else {
                res.status(400).json({ error:'Invalid params', details: result.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })) });
                return;
            }
        } catch (err) {
            next(err);
        }
    }
}

export const validationQuery = (schema: v.GenericSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = v.safeParse(schema, req.query);
            if (result.success) {
                next();
            } else {
                res.status(400).json({ error:'Invalid queryParams', details: result.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })) });
                return;
            }
        } catch (err) {
            next(err);
        }
    }
}