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

//get data all
const product_retrieval = asyncHandler(async (req, res) => {
  try {
    const response = await query(`SELECT * FROM product`);
    if (response.length === 0) throw new ApiError(404, "Data Not Found !!!");
    res.status(200).json(new ApiResponse(200, { data: response }));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(400, "Internal server error");
  }
});

// get data by id
const product_id = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) throw new ApiError(400, "id is required");
    const response = await query(`SELECT * FROM product WHERE id = ?`, [id]);
    if (response.length === 0) throw new ApiError(404, "No Data Found !!!");
    res
      .status(200)
      .json(
        new ApiResponse(200, { data: response }, "Data found Successfully!!!")
      );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.log("error", error);

    throw new ApiError(400, "Internal server error");
  }
});

// get data when both parameters are required to search
const product_all_parameters = asyncHandler(async (req, res) => {
  try {
    const { id, product_name } = req.query;
    if (![id, product_name].every(Boolean))
      throw new ApiError(400, "id and product_name is required to search");
    const response = await query(
      `SELECT * FROM product WHERE id = ? AND product_name LIKE ?`,
      [id, `%${product_name}%`] // use LIKE to partial search as i seatch here with lap and i get name of laptop
    );
    if (response.length === 0) throw new ApiError(404, "No data found !!!");
    res.status(200).json(new ApiResponse(200, { data: response }));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.log("error", error);

    throw new ApiError(400, "Internal server error");
  }
});
export {
  product_creation,
  product_retrieval,
  product_id,
  product_all_parameters,
};
