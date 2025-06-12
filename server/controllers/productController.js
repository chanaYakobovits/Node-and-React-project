const Product = require("../modules/product")
const jwt = require("jsonwebtoken")


const Addproduct = async (req, res) => {
    const { productName, productCode, price, amount, productDescr, recomend, image } = req.body
    if (!productName || !productCode || !price || !amount)
        return res.status(400).json({ message: "all fields are required" })
        
    const duplicateName = await Product.findOne({ productName: productName }).lean()
    if (duplicateName) {
        return res.status(409).json({ message: 'duplicate Name product' })
    }
    const duplicateCode = await Product.findOne({ productCode: productCode }).lean()
    if (duplicateCode) {
        return res.status(409).json({ message: 'duplicate Code product' })
    }
    const product = await Product.create({ productName, productCode, price, amount, productDescr, recomend, image })
    if (!product)
        return res.status(400).json({ message: 'Bad request' })

    return res.status(201).json({message: `product ${product.productName} added` })
}


const getProduct = async (req, res) => {
    const product = await Product.find()

    if (!product)
        return res.status(400).json({ message: 'Bad request' })
    
    res.json(product)
}

const updateProduct = async (req, res) => {
    const { productName, productCode, price, amount, productDescr, recomend, image } = req.body

    if (!productName || !productCode || !price || !amount)
        return res.status(400).json({ message: "all fields are required" })

    const product = await Product.findOne({ productCode: productCode }).lean()
    if (!product) {
        return res.status(409).json({ message: `product ${productName} not found` })
    }

    const productId = await Product.findById(product._id).exec()
    productId.productName = productName
    productId.productCode = productCode
    productId.price = price
    productId.amount = amount
    productId.productDescr = productDescr
    productId.recomend = recomend
    productId.image = image

    const updatedProduct = await productId.save()
    return res.status(201).json({message: `product ${updatedProduct.productName} updated`})
}

const deleteProduct = async (req, res) => {
    const productCode = req.params
    const product = await Product.findOne({ productCode: productCode.productCode }).lean()
    const productId = await Product.findById(product._id).exec()
    if (!productId) {
        return res.status(400).json({ message: `product ${productName} not found`  })
    }
    const result = await productId.deleteOne()
    
    return res.status(201).json({message: `product ${productId.productName} deleted`})
}

module.exports = { Addproduct, getProduct, updateProduct, deleteProduct }