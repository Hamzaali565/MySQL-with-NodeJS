import { asyncHandler } from "../utilities/asyncHandler.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";
import { query } from "../database/db.config.js";

// add data
const product_creation = asyncHandler(async (req, res) => {
  try {
    const { product_name, description, price, created_user } = req.body;
    console.log("req.body", req.body);

    if (![product_name, description, price, created_user].every(Boolean))
      throw new ApiError(400, "All parameters are required !!!");
    let response =
      await query(`INSERT INTO product (product_name, description, price, created_user)
            VALUES ("${product_name}", '${description}', '${price}', '${created_user}')
            `);
    console.log("response", response);
    res.status(200).json(new ApiResponse(200, { data: response }, "Success"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error; // Propagate the structured error
    }
    console.log(error);

    throw new ApiError(500, "Internal server error");
  }
});

//get data
const product_retrieval = asyncHandler(async (req, res) => {
  const response = await query(`SELECT * FROM product`);
  res.status(200).json(new ApiResponse(200, { data: response }));
});
export { product_creation, product_retrieval };
