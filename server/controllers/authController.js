const User = require("../modules/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password) {
        return res.status(400).json({ message: "All fileds arr requred" })
    }
    const foundUser = await User.findOne({ userName: userName }).lean()

    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: "Unathourized userName" })
    }

    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) {
        return res.status(401).json({ message: "Unathourized password" })
    }

    const userInfo = {
        _id: foundUser._id,
        name: foundUser.name,
        userName: foundUser.userName,
        roles: foundUser.roles,
        email: foundUser.email
    }
    const accesstoken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)

    return res.status(201).json(accesstoken)
}


const register = async (req, res) => {
    const { userName, password, name, email, phone } = req.body
    if (!userName || !password || !name || !email)
        return res.status(400).json({ message: 'All fields are required' })
    const duplicateUser = await User.findOne({ userName: userName }).lean()
    if (duplicateUser) {
        return res.status(409).json({ message: 'duplicate user' })
    }
    const duplicateEmail = await User.findOne({ email: email }).lean()
    if (duplicateEmail) {
        return res.status(409).json({ message: 'duplicate Email' })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ userName, password: hashPassword, name, email, phone })
    if (!user)
        return res.status(400).json({ message: 'Bad request' })

    const userInfo = {
        _id: user._id,
        name: user.name,
        userName: user.userName,
        roles: user.roles,
        email: user.email
    }
    const accesstoken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    return res.status(201).json(accesstoken)
}

module.exports = { login, register }