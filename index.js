const path = require("path");
const dotenv = require("dotenv");
// configs
dotenv.config({ path: path.join(__dirname, "configs", ".env") });
const PORT = process.env.PORT || 9999;

const express = require("express");
const morgan = require("morgan");

const db = require("./configs/db");
const router = require("./routes");

const app = express();

// middleware
app.use(morgan("dev"));

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/shops", router);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json(err);
});

// db
db.connect();

// server
app.listen(PORT, () => console.log("Server is listening on port", PORT));
