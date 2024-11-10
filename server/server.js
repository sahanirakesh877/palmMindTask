const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");

const PORT = process.env.PORT || 5000;

// databases connections
const ConnectDB = require("./DataBase/ConnectDb");
ConnectDB();
// middleware
app.use(errorHandler);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(express.json());

// user routes defined
const userrouter = require("./Routes/UserRoutes");
app.use("/api/v1", userrouter);

app.listen(PORT, () => {
  console.log(` Server listening on ${PORT}`);
});
