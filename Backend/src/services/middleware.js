const jwt = require('jsonwebtoken');
const UserModel = require('../Models/user');
const middleware = async (req, res, next) => {

    try {
        const token = req.headers['authorization'];
        const userId = jwt.decode(token);
        const user = await UserModel.find({ user_id: userId.id });
        if (!user)
            return res.status(401).send({ message: "User not Valid" })
        req.user = user
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

module.exports = middleware;