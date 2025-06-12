const mongoose = require('mongoose')

const baskShopSchema = new mongoose.Schema({
    product: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Product"
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "User"
    }
}, {
   timestamps: true
})
module.exports = mongoose.model('BaskShop', baskShopSchema)