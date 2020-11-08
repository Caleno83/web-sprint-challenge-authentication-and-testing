// /* 
//   complete the middleware code to check if the user is logged in
//   before granting access to the next middleware/route handler
// */

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: 'shall not pass!' });
// };

const jwt = require("jsonwebtoken")


function auth() {
    return async (req, res, next) => {

        const authError = {
            message: "You Shall Not Pass"
        }
        try {
            // const token = req.headers.authorization
            //this is for stretch cookies
            const token = req.cookies.token
            if (!token) {
                return res.status(401).json(authError)
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json(authError)
                }

                

                req.token = decoded

                next()
            })
        } catch(err) {
            next(err)
        }
    }
}


module.exports = {
    auth
}
