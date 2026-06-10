import { Router } from "express";
import { validationBody } from "../middleware/validation";
import { createClient, getClients } from '@rmp/invoices-api';
import { rmpCreateClientPayloadSchema  } from '@rmp/shared-models';

const router = Router();

router.get("/", getClients);

router.get("/:id", (req, res) => {
  res.json({message: "Client fetched"});
});

router.post("/", validationBody(rmpCreateClientPayloadSchema), createClient);

router.put("/:id", (req, res) => {
  res.json({message: "Client updated"});
});

export default router;