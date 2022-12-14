// Stopped at 4 hr 35ish mins into the stream.

const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db");

// Load config
dotenv.config({ path: "./config/config.env" });

console.log(process.env.MONGO_URI);
connectDB();

const app = express();

//Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Handlebars
//!Add the word .engine after exphbs
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Static folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/index"));
// app.use("/dashboard", require("./routes/index"));

const PORT = process.env.PORT || 8100;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
// NODE_END comes from the scripts, installed dependency thing missed full explanation
