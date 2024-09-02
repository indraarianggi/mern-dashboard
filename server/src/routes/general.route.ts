import express from "express";

import { getUser } from "@/controllers";

const router = express.Router();

router.get("/users/:id", getUser);

export default router;
