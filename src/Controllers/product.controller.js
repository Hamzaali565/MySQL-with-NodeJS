import { asyncHandler } from "../utilities/asyncHandler.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";
import { query } from "../database/db.config.js";

// add data i.e create single table
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

// insert many
const insertMany = asyncHandler(async (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new ApiError(
        400,
        "Data is a required field and must be a non-empty array!"
      );
    }
    let placeholder = data.map(() => "(?, ?, ?, ?, ?)").join(", ");
    console.log("placeholder", placeholder);

    const values = data.flatMap((items) => [
      items.product_name.toUpperCase(),
      items.description,
      items.price,
      items.created_user,
      items.is_active,
    ]);
    console.log("values", values);
    const response = await query(
      `INSERT INTO product (product_name, description, price, created_user, is_active) VALUES ${placeholder}`,
      values
    );
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: response },
          "Data inserted successfully !!!"
        )
      );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.log(error);
    throw new ApiError(400, "internal server error");
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
      `SELECT * FROM product WHERE id = ? AND product_name = ?`,
      [id, product_name]
    );

    // use LIKE to partial search as i seatch here with lap and i get name of laptop
    // const response = await query(
    //   `SELECT * FROM product WHERE id = ? AND product_name LIKE ?`,
    //   [id, `%${product_name}%`]
    // );
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

// get data with pagination
const product_pagination = asyncHandler(async (req, res) => {
  try {
    const { limit, offset } = req.query;
    if (![limit, offset].every(Boolean))
      throw new ApiError(
        400,
        "Limit and offset is required to paginate query!!!"
      );
    const response = await query(`SELECT * FROM product LIMIT ? OFFSET ?`, [
      +limit,
      +offset,
    ]);

    if (response.length === 0) throw new ApiError(404, "Data not found !!!");
    res.status(200).json(new ApiResponse(200, { data: response }));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.log("error", error);
    throw new ApiError(400, "internal server error");
  }
});

// Partial Search
const product_partial = asyncHandler(async (req, res) => {
  try {
    const { product_name } = req.query;
    if (!product_name) throw new ApiError(400, "Product name is required !!!");
    const response = await query(
      `SELECT * FROM product WHERE product_name LIKE ?`,
      [`%${product_name}%`]
    );
    if (response.length === 0) throw new ApiError(400, "No data found !!!");
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
  product_pagination,
  product_partial,
  insertMany,
};
