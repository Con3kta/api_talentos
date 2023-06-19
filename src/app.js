import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(cors());
mongoose.set("strictQuery", false);

app.use(
  cors({
    exposedHeaders: ["auth-token"],
  })
);

app.use(
  // Added to capture user email
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  res.status(200).send({ message: "API is ready to go!" });
});

app.listen(PORT, () => {
  console.log(`API ready to use in -> http://localhost:${PORT}`);
});
