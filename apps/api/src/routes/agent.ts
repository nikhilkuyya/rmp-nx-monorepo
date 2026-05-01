import { Router } from "express";
import run from '../agent/run';
import { MODELS, updateModel } from "../agent/model.helper";

const router = Router();

router.post("/update-model", (req, res) => {
    const model = req.body.model as MODELS;
    updateModel(model);
    res.json({ message: "Model updated" });
});

router.post("/", async (req, res) => {
    try {
        const response = await run(req.body.prompt);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

export default router;