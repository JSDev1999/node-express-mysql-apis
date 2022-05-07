import productModel from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    await productModel.create(req.body, { value: true }).then((resp) => {
      res.status(201).json({
        status: 201,
        msg: "Created Successfully",
        data: resp,
      });
    });
  } catch (error) {
    res.status(417).json({
      msg: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    await productModel.findAll({}).then((results) => {
      console.log("yyy", results);
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

export const getSingleProduct = async (req, res) => {
  try {
    console.log("ttt", req.query.title);
    await productModel
      .findOne({ where: { title: req.query.title } })
      .then((results) => {
        console.log("yyy", results);
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
