require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

// routers
const authRouter = require("./routes/auth");
const reviewsRouter = require("./routes/reviews");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// serve static files if needed (optional)
app.use(express.static("public"));

// routes
app.use("/api/v1/auth", authRouter); // Authentication routes for registering and logging in users
app.use("/api/v1/reviews", authenticateUser, reviewsRouter); // Protect review routes with authentication

// middleware for handling errors and not found routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
