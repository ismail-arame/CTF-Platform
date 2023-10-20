const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const logger = require("../src/configs/logger.config");

// dot env config
dotenv.config();

//env variables
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

//mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

//mongodb connection
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("connected successfully to the mongodb server...");
  })
  .catch((error) => {
    logger.error(`error connecting to mongodb ${error}`);
    //connecting to the database is very important this i why we kill the process when connecting to db fails
    process.exit(1);
  });

let server;
server = app.listen(PORT, () => {
  console.log("Server is listening at PORT ", PORT);
});

const exitHandler = () => {
  if (server) {
    logger.info("server is closed");
    // stoping the process gracefully
    process.exit(1);
  } else {
    process.exit(1);
  }
};

// handle server error
const unExpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

//listening for process event
process.on("uncaughtException", unExpectedErrorHandler);
process.on("unhandledRejection", unExpectedErrorHandler);

//SIGTERM (terminate process gracefully)
process.on("SIGTERM", () => {
  if (server) {
    logger.info("server closed.");
    process.exit(1);
  }
});
