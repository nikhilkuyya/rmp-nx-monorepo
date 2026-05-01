import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json([]);
});

router.get("/:id", (req, res) => {
  res.json({message: "Client fetched"});
});

router.post("/", (req, res) => {
  res.json({message: "Client created"}).status(201);
});

router.put("/:id", (req, res) => {
  res.json({message: "Client updated"});
});

export default router;