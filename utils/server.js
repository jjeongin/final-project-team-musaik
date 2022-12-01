require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config.db");
const postRoutes = require("./routes/postROutes");


connectDB();

const app = express();

app.use(express.json());
app.use("/api/v1/posts", postRoutes);