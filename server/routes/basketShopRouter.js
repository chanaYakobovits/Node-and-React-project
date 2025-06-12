const express = require("express")
const BasketShopRouter = express.Router()
const basketShopController =require("../controllers/basketShopController")

const verifyJWT=require("../middleware/verifyJWT")

 BasketShopRouter.use(verifyJWT)
BasketShopRouter.get("/",basketShopController.getBasketShop)
BasketShopRouter.post("/",basketShopController.AddProduct)
BasketShopRouter.delete("/:id",basketShopController.deleteProduct)

module.exports = BasketShopRouter