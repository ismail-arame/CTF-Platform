const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const fileupload = require("express-fileupload");
const cors = require("cors");
const routes = require("./routes/index");
const rateLimit = require("express-rate-limit");
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

//sanitize mongo request data
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

// rate limiting middleware
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 2,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: {
      status: 429,
      message: "Rate limit exceeded. Please try again later.",
    },
  },
});
// app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

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
