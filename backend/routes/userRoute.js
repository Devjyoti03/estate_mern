import express from 'express';
import { bookVisit, cancelBook, createUser, getAllBook, getAllFav, toFav } from '../controllers/userCntrl.js';
import jwtCheck from '../config/auth0config.js';
const router = express.Router()

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.post("/getAll", getAllBook);
router.post("/cancel/:id", jwtCheck, cancelBook);
router.post("/favs/:rid", jwtCheck, toFav)
router.post("/allFavs", jwtCheck, getAllFav)

export {router as userRoute}