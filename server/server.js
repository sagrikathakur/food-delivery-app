import app from "./app.js";
import env from "./config/env.js";
import { initDb } from "./config/initDb.js";

const PORT = env.PORT || 3000;

app.listen(PORT, async () => {
  await initDb();
  console.log(`Server is up and running on port ${PORT}`);
});