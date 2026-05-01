import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json([]);
});

router.post("/", (req, res) => {
  res.json({message: "Invoice created"}).status(201);
});

router.get("/:id", (req, res) => {
  res.json({message: "Invoice fetched"});
});

router.put("/:id", (req, res) => {
  res.json({message: "Invoice updated"});
});

export default router;