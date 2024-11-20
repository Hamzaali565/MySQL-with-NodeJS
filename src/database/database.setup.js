import { query } from "./db.config.js";
import { createTable } from "../Models/product.model.js";

const setupDatabase = async () => {
  try {
    // Ensure the table exists
    await query(createTable);
    console.log("Database setup completed. Tables are ready.");
  } catch (error) {
    console.error("Error setting up database:", error.message);
    throw error;
  }
};

export { setupDatabase };
