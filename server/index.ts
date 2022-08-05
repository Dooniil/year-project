import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import express from "express";
// import apiRouter from "./routers/apiRouter.js";
import authRouter from "./routers/authRouter.js";
import sequelize from "./database/connect.js";

const app: express.Application = express();

const hostname: string = process.env.HOST;
const port: number | string = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTING
app.use("/", authRouter);

// DATABASE AND STARTING
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port as number, hostname, (): void => {
      console.log("Express server is running");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
