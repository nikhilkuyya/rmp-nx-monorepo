import { Router } from 'express';
import { validationBody } from '../middleware/validation';
import { clientController } from '@rmp/invoices-api';
import { rmpCreateClientPayloadSchema } from '@rmp/shared-models';

const router = Router();

router.get('/', clientController.getClients);

router.get('/:id', clientController.getClientById)

router.post('/', validationBody(rmpCreateClientPayloadSchema), clientController.createClient);

router.put('/:id', clientController.updateClient);

export default router;
