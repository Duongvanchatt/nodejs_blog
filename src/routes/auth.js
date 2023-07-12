import { Router } from "express";
import { signin, signup } from "../controllers/auth";
import { getUser } from "../controllers/user";


const router = Router();

router.post('/signin', signin);
router.post('/signup',signup);
router.get('/users',getUser);

export default router;
