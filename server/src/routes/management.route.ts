import express from "express";

import { getAdmins, getUserPerformance } from "@/controllers";

const router = express.Router();

router.get("/admins", getAdmins);
router.get("/performance/:userId", getUserPerformance);

export default router;
