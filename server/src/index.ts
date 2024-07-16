import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { initializeDatabase } from "./database/database";
import postRoutes from "./routes/posts";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

initializeDatabase();

app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
