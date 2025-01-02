import { loadEnvFile } from "process";
import app from "@server/server";
import "@config/mongodb";

loadEnvFile();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
