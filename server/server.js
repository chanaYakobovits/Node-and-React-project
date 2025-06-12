require("dotenv").config()
const express = require("express")
const app = express();
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 7001

//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

const mongoose = require("mongoose")
const connectDB =require ("./config/connectDB")
connectDB()

//routes
app.use("/api/auth", require("./routes/authRoute"))
app.use("/api/product", require("./routes/productRoute"))
app.use("/api/basketShop", require("./routes/basketShopRouter"))

//CONNECT
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
 mongoose.connection.on('error', err => {
    console.log(err)
    })
