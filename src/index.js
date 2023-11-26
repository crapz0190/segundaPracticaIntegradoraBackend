import server from "./app.js";
import env from "./dotenv.js";
import database from "./db/database.js";

database();
server.listen(env.PORT, () => {
  console.log(`Server on port: http://localhost:${env.PORT}/login`);
});
