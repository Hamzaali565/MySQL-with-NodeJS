import express from "express";
import { all_routes } from "./Routes/Summary/summary.routes.js";

const app = express();
app.use(express.json());

all_routes(app);

export { app };
