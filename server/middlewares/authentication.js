const jwt = require('jsonwebtoken');
//==============
// VERIFY TOKEN
//==============

let verifyToken = (req, res, next) => {

    let token = req.get('token');
    console.log(token);

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'Token is not valid'
            });
        }

        req.user = decoded.user;
        next();
    });

};

//=====================
// VERIFY ADMIN  ROLE
//=====================
let verifyAdminRole = (req, res, next) => {

    let user = req.user;

    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'The user is not admin'
            }
        });
    };
};

module.exports = { verifyToken, verifyAdminRole };