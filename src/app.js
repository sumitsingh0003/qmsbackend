const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/vendors", require("./routes/vendor.routes"));
app.use("/api/reports", require("./routes/report.routes"));

app.use(errorHandler); 

module.exports = app;
