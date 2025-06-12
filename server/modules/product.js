const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
   productName: {
      type: String,
      lowercase: true,
      required: true,
      uniqe: true,
      trim: true
   },
   productCode: {
      type: Number,
      required: true,
      uniqe: true,
   },
   price: {
      type: Number,
      required: true,
      min: 0
   },
   amount: {
      type: Number,
      required: true,
      min: 0
   },
   productDescr: {
      type: String,
      immutable: true
   },
   recomend: {
      type: String,
   },
   image: {
      type: String,

   }

}, {
   timestamps: true
})
module.exports = mongoose.model('Product', productSchema)