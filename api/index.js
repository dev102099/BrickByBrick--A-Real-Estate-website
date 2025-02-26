const express = require("express");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const listRoute = require("./routes/listing.route");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "https://brickbybrick-a-real-estate-website-1.onrender.com", // Frontend URL
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

mongoose
  .connect(process.env.MONGO, { autoIndex: true })
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Listening on ${PORT}`);
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/listing", listRoute);
app.use(express.static(path.join(__dirname, "Client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
