// server
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
// routers
const authRouter = require("./routes/authRouter");
const todoRouter = require("./routes/todoRouter");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// default page
app.get("/home", (req, res) => {
  res.send("Thank you for visiting");
});

// setting up route handlers based on route prefix
app.use("/auth", authRouter);
app.use("/todo", todoRouter);

app.listen(PORT, function () {
  console.log("listening on PORT:", PORT);
  console.log(process.env.BASE_URL);
});
