import productRoutes from "../Detail/product.routes.js";
import * as dotenv from "dotenv";
dotenv.config();

const all_routes = async (app) => {
  const api_version = process.env.APIVERSION || "/api/v1";
  try {
    app.use(api_version, productRoutes);
  } catch (error) {
    console.log("Error while summarizing routes");
  }
};

export { all_routes };
