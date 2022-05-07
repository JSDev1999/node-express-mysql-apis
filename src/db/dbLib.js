import Sequelize from "sequelize";
import { Config } from "../config/db.config.js";
const dbconfig = Config.msqlEnvironment.development;

export const sequelizeDB = new Sequelize.Sequelize(
  dbconfig.database,
  dbconfig.username,
  dbconfig.password,
  {
    host: dbconfig.host,
    dialect: dbconfig.dialect,
  }
);
