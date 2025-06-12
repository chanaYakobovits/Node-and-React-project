const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   userName: {
      type: String,
      lowercase: true,
      required: true,
      uniqe: true,
      trim: true
   },
   password: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      uniqe: true,
   },
   phone: {
      type: String,
      required: true,
   },
   roles: {
      type: String,
      enum: ["user", "Manager"],
      default: "user"
   },
   active: {
      type: Boolean,
      default: true
   },

}, {
   timestamps: true
})
module.exports = mongoose.model('User', userSchema)