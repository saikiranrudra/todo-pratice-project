import express from "express";
import cors from "cors";
import morgan from "morgan";
const rfs = require("rotating-file-stream");
import path from "path";
import AppError from "./utils/AppError";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";

// controllers
import globalErrorHandler from "./controllers/errorController";

// routes
import taskRoutes from "./routes/taskRoutes";

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
app.use(cors());

// implementing bodyParse
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// remove mongodb query parameters from req body prevent no-sql injection
app.use(mongoSanitize());

// http request compression
app.use(compression());

// testing route
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to Todo App..." });
});



// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev", { stream: logStream }));
  // app.use(morgan("dev"));
} else {
  app.use(morgan("combined", { stream: logStream }));
  // app.use(morgan("combined"));
}

// Routes
app.use('/api/v1/task', taskRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, "404"));
});

app.use(globalErrorHandler);

export default app;
