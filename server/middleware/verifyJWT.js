const jwt = require("jsonwebtoken")

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unathourized" })
    }
    const token = authHeader.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decode)=>{
            if(err) return res.status(401).json({ message: "Forbidden"})
        req.user=decode
        next()
        }
    )
}
module.exports = verifyJWT