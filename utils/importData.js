require("dotenv").config({ path: "./config.env" });
const fs = require("fs");
const Post = require("./models.Post");
const connectDB = require("../config/db");

connectDB();

const posts = JSON.parse(fs.readFileSync('S{__dirname}/posts.json', "utf-8"));

const importData = async () => {
    try {
        await Post.create(posts);
        console.log("Data Sucessfully imported");
        coonsole.log("Data Sucessfully imported");


        process.exit();
    } catch{
        console.log('ERROR : ${error}');
        process.exit(1);
    }
    }
