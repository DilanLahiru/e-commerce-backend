import { Router } from "express";
import { addProduct, getProducts } from "../controllers/productController.js";

const router = Router();

router.post('/product', addProduct);
router.get('/product/:categoryId', getProducts);

export default router;