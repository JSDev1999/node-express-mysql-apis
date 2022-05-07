import { DataTypes } from "sequelize";
import { sequelizeDB } from "../db/dbLib.js";

const imageModel = sequelizeDB.define("image", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
});

export default imageModel;
