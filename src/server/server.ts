import express, { Application } from "express";
import morgan from "morgan";
import userRoutes from "@routes/userRoutes";
import roleRoutes from "@routes/roleRoutes";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);

export default app;
