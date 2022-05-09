import productModel from "../models/productModel.js";
import productValidation from "../validations/productValidation.js";
import HttpErrors from "http-errors";

export const createProduct = async (req, res) => {
  try {
    const { error, value } = productValidation.validate(req.body);

    if (!error && value) {
      await productModel.create(value, { value: true }).then((resp) => {
        res.status(201).json({
          status: 201,
          msg: "Created Successfully",
          data: resp,
        });
      });
    } else {
      throw HttpErrors.Conflict(error.details[0].message);
    }
  } catch (error) {
    res.status(417).json({
      msg: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    await productModel.findAll({}).then((results) => {
      res.status(200).json({
        status: 200,
        data: results,
        msg: "Operation successful",
      });
    });
  } catch (error) {
    res.status(417).json({
      msg: error.message,
    });
  }
};

export const countAllProducts = async (req, res) => {
  try {
    const products = await productModel.findAndCountAll({}).then((results) => {
      res.status(200).json({
        status: 200,
        data: results?.rows,
        length: results?.count,
        msg: "Operation successful",
      });
    });
    console.log("ppp", products);
  } catch (error) {
    res.status(417).json({
      msg: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    await productModel
      .findOne({ where: { title: req.query.title } })
      .then((results) => {
        res.status(200).json({
          status: 200,
          data: results,
          msg: "Operation successful",
        });
      });
  } catch (error) {
    res.status(417).json({
      msg: error.message,
    });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { error, value } = productValidation.validate(req.body);

    if (!error && value) {
      await productModel
        .update(value, {
          where: {
            id: req.params.id,
          },
        })
        .then((resp) => {
          res.status(201).json({
            status: 201,
            msg: "Updated Successfully",
            data: resp,
          });
        });
    } else {
      throw HttpErrors.Conflict(error.details[0].message);
      next();
    }
  } catch (error) {
    res.status(417).json({
      msg: error.message,
    });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    console.log("ppp", req.params, req.query);
    await productModel
      .destroy({ where: { id: JSON.parse(req?.query?.products) } })
      .then((results) => {
        res.status(200).json({
          msg: "Delete Successful",
          status: 200,
          data: results,
        });
      })
      .catch((error) => {
        throw HttpErrors.Conflict(error?.details[0]?.message);
      });
  } catch (error) {
    res.status(417).json({
      msg: error.message,
    });
  }
};
