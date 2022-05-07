import productModel from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    console.info(req.body);
    await productModel.create(req.body, { value: true }).then((resp) => {
      // console.log("tt", resp.da);
      res.status(201).json({
        msg: "data",
        data: resp,
      });
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
};
