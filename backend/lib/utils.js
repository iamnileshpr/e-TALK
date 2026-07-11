import jwt from "jsonwebtoken"

export const generateToken = function(userId, res) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7day' })
    res.cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax',
        secure: false //process.env.NODE_ENV != "development"
    })
    return token;
}