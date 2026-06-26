import { Router } from 'express';
import { validationBody, validationQuery } from '../middleware/validation';
import { clientController } from '@rmp/invoices-api';
import { rmpCreateClientPayloadSchema } from '@rmp/shared-models';

import * as v from 'valibot';

const router = Router();

const clientQuery = v.pipe(
    v.object({
        name: v.optional(v.string())
    })
);

router.get('/', validationQuery(clientQuery), clientController.getClients);

router.get('/:id', clientController.getClientById)

router.post('/', validationBody(rmpCreateClientPayloadSchema), clientController.createClient);

router.put('/:id', clientController.updateClient);

export default router;
