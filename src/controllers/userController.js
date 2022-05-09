import HttpErrors from "http-errors";
import userModel from "../models/userModel.js";
import Bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import {
  loginValidation,
  registerValidation,
} from "../validations/userValidation.js";

export const registerUser = async (req, res, next) => {
  try {
    const { error, value } = registerValidation.validate(req.body);

    if (!error && value) {
      const salt = await Bcrypt.genSaltSync(10);

      const hashedPassword = await Bcrypt.hashSync(value?.password, salt);
      value.password = hashedPassword;
      //    await userModel.findOrCreate(value)

      const isUserExists = await userModel.findOne({
        where: { email: req.body.email },
      });

      if (isUserExists) {
        res.status(200).json({
          status: 200,
          msg: "User Exists",
        });
      } else {
        await userModel
          .create(value)
          .then((results) => {
            // delete results?.password;
            const { password, ...otherData } = results?.dataValues;
            res.status(201).json({
              status: 201,
              msg: "Created Successfully",
              data: otherData,
            });
          })
          .catch((error) => {
            res.status(417).json({
              status: 417,
              msg: error.message,
            });
            next();
          });
      }
    } else {
      throw HttpErrors.Conflict(error.details[0].message);
    }
  } catch (error) {
    res.status(417).json({
      status: 417,
      msg: error.message,
    });
    next();
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { error, value } = loginValidation.validate(req.body);
    if (!error && value) {
      const isUserExists = await userModel.findOne({
        where: { email: req.body.email },
      });

      if (isUserExists) {
        const hasValidPassword = await Bcrypt.compareSync(
          req.body.password,
          isUserExists?.password
        );

        if (hasValidPassword) {
          const { password, ...otherData } = isUserExists.dataValues;
          const token = JWT.sign(
            { _id: otherData.user_key },
            process.env.JWT_SECRET
          );
          const data = { ...otherData, token: token };

          res.status(200).json({
            msg: "Login Succesfull",
            data: data,
            status: 200,
          });
        } else {
          res.status(422).json({
            msg: "Invalid Credentials",
            status: 417,
          });
        }
      } else {
        res.status(422).json({
          msg: "Invalid Credentials",
          status: 417,
        });
      }
    } else {
      throw HttpErrors.Conflict(error.details[0].message);
    }
  } catch (error) {
    res.status(417).json({
      status: 417,
      msg: error.message,
    });
    next();
  }
};

export const getUserData = async (req, res, next) => {
  try {
    const { user_key } = req.query;
    await userModel
      .findOne({ where: { user_key: user_key } })
      .then((results) => {
        const { password, ...otherData } = results?.dataValues;
        res.status(200).json({
          status: 200,
          msg: "operation Successful",
          data: otherData,
        });
      });
  } catch (error) {
    res.status(417).json({
      status: 417,
      msg: error.message,
    });
    next();
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    await userModel
      .findAndCountAll({
        attributes: {
          exclude: ["password"],
        },
      })
      .then((results) => {
        const { password, ...otherData } = results.rows;

        res.status(200).json({
          msg: "Operation success",
          data: otherData,
          length: results.count,
        });
      });
  } catch (error) {
    res.status(417).json({
      status: 417,
      msg: error.message,
    });
    next();
  }
};
