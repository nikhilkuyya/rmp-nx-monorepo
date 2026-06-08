import { Router } from "express";
import * as v from 'valibot';
import { validationBody } from "../middleware/validation";
import { getClients } from '@rmp/invoices';

const router = Router();

const createClientSchema = v.object({
  name: v.string(),
  email: v.string(),
  phone: v.string(),
  address: v.string(),
});

router.get("/", async (req, res) => {
  const clients = await getClients(req, res);
  res.json(clients);
});

router.get("/:id", (req, res) => {
  res.json({message: "Client fetched"});
});

router.post("/", validationBody(createClientSchema), (req, res) => {
  res.json({message: "Client created"}).status(201);
});

router.put("/:id", (req, res) => {
  res.json({message: "Client updated"});
});

export default router;