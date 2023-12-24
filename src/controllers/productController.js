const { productList } = require("../../default");

const getAllProduct = (req, res) => {
  try {
    res.status(200).json({
      data: productList,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productList.find(
      (product) => product.id === Number(id)
    );
    res.status(200).json({
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = {
      id: productList[productList.length - 1]?.id + 1,
      name,
      price,
    };
    await productList.push(newProduct);
    res.status(201).json({
      data: newProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
      error: err,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = await productList.find((product) => {
      if (product.id === Number(id)) {
        product.name = name;
        product.price = price;
        return product;
      }
    });
    res.status(200).json({
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productList.find((product) => product.id === id);
    productList.splice(productList.indexOf(product), 1);
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err,
    });
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
