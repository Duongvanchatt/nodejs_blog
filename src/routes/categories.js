import { Router } from 'express';
import { create, deletes, list, read } from '../controllers/categories';
import { checkAuth } from '../middlewere/checkAuth';

const router = Router();

router.get("/categories", checkAuth, list);
router.post('/categories', checkAuth, create);
router.delete('/categories/:slug', checkAuth, deletes);
router.get('/categories/:slug', checkAuth, read);
export default router