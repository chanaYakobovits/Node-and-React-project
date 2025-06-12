const Product = require("../modules/product")
const User = require("../modules/User")
const BasketShop = require("../modules/basketShop")

const AddProduct = async (req, res) => {
    const { product} = req.body
    if (!product)
        return res.status(400).json({ message: "all fields are required" })
    const productFound = await Product.findById(product).exec()
    if (!productFound) {
        return res.status(409).json({ message: `product ${product} not found `})
    }
    const userFound = await User.findById(req.user._id).exec()
    if (!userFound) {
        return res.status(409).json({ message: `user ${req.user._id} not found ` })
    }
    const user=req.user._id
    const basketShop = await BasketShop.create({ product, user })
    if (!basketShop)
        return res.status(400).json({ message: 'Bad request' })

    return res.status(201).json({ massage: `product ${productFound.productName} add to bask` })
}
 
const getBasketShop = async (req,res)=>{
    const baskShop = await BasketShop.find({user:req.user._id}).lean()
    if (!baskShop){
        return res.status(409).json({message:`No product in your baskShop`})
    }
    //שליפה של כל המוצרים מתוך האוביקט של הסלים שחזר 
    //ומכיל עבור כל סל: משתמש ומוצר
    const arrId = baskShop.map((p)=> p.product._id)
    let newArr = []
    //חיפוש בעבור כל אידי של מוצר שחזר את המוצר בעצמו ודחיפה למערך המוצרים
    await Promise.all(arrId.map(async (item)=>{
        const prod = await Product.findById(item)
        if (prod) newArr.push(prod)
    }))
    //החזרת מערך של מוצרים שנמצאים בסל של המשתמש הספציפי הזה
    res.json(newArr)   
}

const deleteProduct = async (req, res) => {
    const prodId = req.params
    const userId = req.user._id
    //קבלת מערך הסלים של המשתמש הספציפי הזה
    const getBaskShop = await BasketShop.find({user:userId})
    let prod
    const delet = getBaskShop.map(p => 
    p.product._id.toString() === prodId.id?  prod = p : console.log("---") )
    if (!prod){
        return res.status(409).json({message:`product '${prodId.id}' not found`})
    }
    const res2 = await prod.deleteOne()
    
    res.json({message:`Product '${prod.id}' delete from your baskShop`})
}

module.exports = { AddProduct, getBasketShop, deleteProduct }