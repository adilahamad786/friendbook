const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const userRoute = require("./src/routes/users");
const postRoute = require('./src/routes/posts');
const commentRoute = require('./src/routes/comment');
const likeRoute = require('./src/routes/like');
const googleOAuthRoute = require('./src/routes/googleOAuth');
const errorMiddleware = require("./src/middleware/errorMiddleware");
const connectDB = require("./src/config/database");

// Configure environment variables
dotenv.config();
const port = process.env.PORT;

// Connect with database
connectDB()

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(compression());

app.use("/api/oauth", googleOAuthRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/like", likeRoute);

// Page not found routers
app.get("/*", (req, res) => {
  res.status(404).send("Page not Found!")
});

// Error handler middleware
app.use(errorMiddleware);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname,'client','build')))
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});