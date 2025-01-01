import app from "@server/server";
import { loadEnvFile } from "process";

loadEnvFile();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
