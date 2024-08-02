import express from 'express';
import { createRes, deleteResidency, getAll, getRes } from '../controllers/resCntrl.js';
import jwtCheck from '../config/auth0config.js';
const router = express.Router()

router.post("/create", jwtCheck, createRes)
router.get("/allresd", getAll)
router.get("/:id", getRes)
router.delete("/delete/:id", jwtCheck, deleteResidency)
export {router as residencyRoute}