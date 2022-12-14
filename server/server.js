import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import express from "express";
import authRouter from "./routers/authRouter.js";
import sequelize from "./database/connect.js";
import cors from "cors";
import usersRouter from "./routers/usersRouter.js";

const app = express();

const hostname = process.env.HOST;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DATABASE AND STARTING
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    // CONNECTING ROUTERS
    app.use("/", authRouter);
    app.use("/users", usersRouter);

    app.listen(port, hostname, () => {
      console.log("Express server is running");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
