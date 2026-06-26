import { Router } from 'express';
import * as v from 'valibot';
import { validationQuery } from '../middleware/validation';
import { teamController } from '@rmp/invoices-api';

const router = Router();

const teamQuery = v.pipe(
  v.object({
    name: v.optional(v.string()),
    gstin: v.optional(v.string()),
  }),
  // Runs a custom check against the whole object
  v.check(
    (input) => input.name !== undefined || input.gstin !== undefined,
    'You must provide either an email or a phone number.',
  ),
);

const teamQueryOptional = v.pipe(
  v.object({
    name: v.optional(v.string())
  })
)

router.get('/', validationQuery(teamQueryOptional), teamController.getTeams);

router.get('/member', validationQuery(teamQuery), teamController.getTeam);

export default router;
