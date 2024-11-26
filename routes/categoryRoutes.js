import { Router } from "express";
import { addCategory, getAllCategories } from "../controllers/categoryController.js";

const router = Router();

router.post('/category', addCategory);
router.get('/categories', getAllCategories);

export default router;