import app from "@server/server";
import { loadEnvFile } from "process";

loadEnvFile();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
