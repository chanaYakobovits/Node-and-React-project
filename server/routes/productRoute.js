const express = require("express")
const productRouter = express.Router()
const productController =require("../controllers/productController")
const verifyJWT=require("../middleware/verifyJWT")

productRouter.get("/",productController.getProduct)

productRouter.use(verifyJWT)
productRouter.post("/",productController.Addproduct)
productRouter.put("/",productController.updateProduct)
productRouter.delete("/:productCode",productController.deleteProduct)

module.exports = productRouter