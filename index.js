import { setupDatabase } from "./src/database/database.setup.js";
import { app } from "./src/app.js";
import * as dotenv from "dotenv";
dotenv.config();

let PORT = process.env.PORT || 3001;

setupDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server connection failed with error`, err);
  });
