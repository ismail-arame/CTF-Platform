const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const fileupload = require("express-fileupload");
const cors = require("cors");
const routes = require("./routes/index");
const createHttpError = require("http-errors");

const app = express();

//morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// helmet
app.use(helmet());

// parse json from body and url middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sanitice mongo request data
app.use(mongoSanitize());

// cookie parser
app.use(cookieParser());

// gzip compression
app.use(compression());

// express fileupload
app.use(
  fileupload({
    useTempFiles: true,
  })
);

//cors
app.use(cors());

//routes
app.use("/", routes);

//Handling 404 Not Found Status
app.use(async (res, req, next) => {
  next(createHttpError.NotFound("This route doesn't exist"));
});

//handling http errors
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

module.exports = app;
