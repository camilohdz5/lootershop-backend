import express, { Express } from "express";
import cors from "cors";
import { authRoutes } from "./router";
import connectDB from "./services/mongodb";

const app: Express = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/v1", authRoutes);

export default app;
