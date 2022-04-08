import { Router } from 'express';
import { list, create, remove, update, get } from '../controllers/product';
import { userById } from '../controllers/user';
import { checkAuth,isAdmin, isAuth, requireSignin } from '../middlewere/checkAuth';
const router = Router();
//get all
router.get('/products', list);
//get a product
router.get('/products/:id', get);
//create product
router.post('/products',create);
// delete product
router.delete("/products/:id", remove);
// update product
router.put("/products/:id", update);

router.param("userId", userById)

export default router;