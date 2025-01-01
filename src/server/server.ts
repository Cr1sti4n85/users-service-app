import express, { Application } from "express";
import morgan from "morgan";
import userRoutes from "@routes/userRoutes";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", userRoutes);

export default app;
