import app from "./src/app"
import { _Config } from "./src/config/config";
import dbConnection from "./src/config/db";

const startServer = async () => {
  console.log();
  
  await dbConnection();

  
  const port = _Config.PORT || 3000

  app.listen(port, () => {
    console.log(`server listing on port ${port}`);

  })
}
startServer();