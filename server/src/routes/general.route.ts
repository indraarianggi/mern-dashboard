import express from "express";

import { getDashboardStat, getUser } from "@/controllers";

const router = express.Router();

router.get("/users/:id", getUser);
router.get("/dashboard", getDashboardStat);

export default router;
