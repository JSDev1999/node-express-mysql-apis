import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { sequelizeDB } from "./db/dbLib.js";
import appRouter from "./routes/index.js";

//const sequelizeDB = require("./db/dbLib.js");

dotenv.config();
// app initilization
const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined"));

try {
  sequelizeDB.authenticate();
  sequelizeDB
    .sync()
    .then(() => {
      app.listen(port, () => {
        console.log("server running on port", port);
      });
    })
    .catch((err) => {
      console.log("db err", err);
    });
} catch (error) {
  console.log("db err", error);
}

app.get("/", (req, res) => {
  res.status(200).json({
    name: "mee",
    date: new Date().getTime(),
  });
});

app.use("/api/v1", appRouter);
