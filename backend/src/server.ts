import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

//configuring dotenv
dotenv.config({ path: path.join(__dirname, '..', '.env') })
import app from "./app"; // App should be imported after configuring dotenv

mongoose
  .connect("" + process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`)
})

process.on('unhandledRejection', (err: { name: string, message: string }) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});