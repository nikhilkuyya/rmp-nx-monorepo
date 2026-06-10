import { Router } from "express";
import { validationBody } from "../middleware/validation";
import { createClient, getClients } from '@rmp/invoices';
import { rmpCreateClientPayloadSchema  } from '@rmp/shared-models';

const router = Router();

router.get("/", async (req, res) => {
  const clients = await getClients(req, res);
  res.json(clients);
});

router.get("/:id", (req, res) => {
  res.json({message: "Client fetched"});
});

router.post("/", validationBody(rmpCreateClientPayloadSchema), async (req, res) => {
  await createClient(req,res);
  res.status(201).json();  
});

router.put("/:id", (req, res) => {
  res.json({message: "Client updated"});
});

export default router;