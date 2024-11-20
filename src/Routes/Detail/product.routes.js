import { Router } from "express";
import {
  product_all_parameters,
  product_creation,
  product_id,
  product_retrieval,
} from "../../Controllers/product.controller.js";

const router = Router();

router.route("/product").post(product_creation);
router.route("/product").get(product_retrieval);
router.route("/product-id").get(product_id);
router.route("/product-all-params").get(product_all_parameters);

export default router;
