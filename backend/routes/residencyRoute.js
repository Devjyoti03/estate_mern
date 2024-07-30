import express from 'express';
import { createRes, getAll, getRes } from '../controllers/resCntrl.js';
import jwtCheck from '../config/auth0config.js';
const router = express.Router()

router.post("/create", jwtCheck, createRes)
router.get("/allresd", getAll)
router.get("/:id", getRes)
export {router as residencyRoute}