import { DataTypes } from "sequelize";
import { sequelizeDB } from "../db/dbLib.js";

const productModel = sequelizeDB.define("product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

export default productModel;
