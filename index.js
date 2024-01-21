import app from "./app.js";
import dotenv from "dotenv";
import logger from "./utils/log/logger.js";
import connectDB from "./database/db.js"
import cors from "cors";

const port = process.env.PORT || 9209;
dotenv.config();

const server = app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Database connected successfully`);
    logger.info(`Server is running on port ${port}`);
  } catch (error) {
    logger.error(error);
  }
});

app.use(cors()); // Enable CORS
