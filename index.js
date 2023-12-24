const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const productRoutes = require("./src/routes/productsRoutes");
const { timeStampMiddleware } = require("./src/middleware/middleware");

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/api", timeStampMiddleware, productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
