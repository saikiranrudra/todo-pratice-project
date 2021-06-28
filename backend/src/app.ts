import express from "express";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";

const rfs = require("rotating-file-stream")
import path from "path";
import compression from "compression";
import AppError from "./utils/AppError";
import globalErrorHandler from "./controllers/errorController";

// Initilising express app
const app = express();

const logFileName = `${process.env.NODE_ENV}.log`;
const logStream = rfs.createStream(logFileName, {
  size: "50M", // rotates every 50 MB written 
  interval: "1d",
  compress: "gzip", // compress rotated files
  path: path.join(__dirname,'..',"logs"),
});

// Implementing cors
app.use(
  cors({
    origin: process.env.CLIENT_URL, // only this route is support client side
  })
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize);

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev", { stream: logStream }));
  // app.use(morgan("dev"));
} else {
  app.use(morgan("combined", { stream: logStream }));
  // app.use(morgan("combined"));
}

app.use(compression);

// Routes

app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, "404"));
});

app.use(globalErrorHandler);

export default app;
