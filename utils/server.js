require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config.db");
const postRoutes = require("./routes/postROutes");