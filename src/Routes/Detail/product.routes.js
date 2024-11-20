import { Router } from "express";
import {
  product_creation,
  product_retrieval,
} from "../../Controllers/product.controller.js";

const router = Router();

router.route("/product").post(product_creation);
router.route("/product").get(product_retrieval);

export default router;
