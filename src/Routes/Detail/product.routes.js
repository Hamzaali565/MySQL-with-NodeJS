import { Router } from "express";
import {
  delete_row,
  insertMany,
  product_all_parameters,
  product_creation,
  product_id,
  product_pagination,
  product_partial,
  product_retrieval,
  update_delete_flag,
  update_row,
} from "../../Controllers/product.controller.js";

const router = Router();

router.route("/product").post(product_creation);
router.route("/product-many").post(insertMany);
router.route("/product").get(product_retrieval);
router.route("/product-id").get(product_id);
router.route("/product-all-params").get(product_all_parameters);
router.route("/product-pagination").get(product_pagination);
router.route("/product-partial").get(product_partial);
router.route("/product-update").put(update_row);
router.route("/product-update-flag").put(update_delete_flag);
router.route("/product-delete").delete(delete_row);

export default router;
