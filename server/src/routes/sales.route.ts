import express from "express";

import { getSales } from "@/controllers";

const router = express.Router();

router.get("/", getSales);

export default router;
