import { Router } from "express";
import * as v from 'valibot';
import { validationBody } from "../middleware/validation";

const router = Router();

const createClientSchema = v.object({
  name: v.string(),
  email: v.string(),
  phone: v.string(),
  address: v.string(),
});

router.get("/", (req, res) => {
  res.json([]);
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