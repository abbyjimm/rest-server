const express = require('express');
const User = require('../models/user');
const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();


app.get('/user', verifyToken, (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.lilmit || 5;
    limit = Number(limit);

    User.find({ /*google: true we can put a condition */ status: true }, 'name email role status google img')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ /*google: true we can put a condition */ status: true }, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    rows: count
                });
            })

        });
});

app.post('/user', [verifyToken, verifyAdminRole], (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //userDB.password = null;

        res.json({
            ok: true,
            user: userDB
        });
    });
});

app.put('/user/:id', [verifyToken, verifyAdminRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    User.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
});

app.delete('/user/:id', [verifyToken, verifyAdminRole], (req, res) => {

    let id = req.params.id;

    //Physical delete
    /*User.findByIdAndRemove(id, (err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!deletedUser) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        res.json({
            ok: true,
            user: deletedUser
        });
    });*/

    //Logical delete
    let changeStatus = {
        status: false
    }
    User.findOneAndUpdate(id, changeStatus, { new: true }, (err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!deletedUser) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        res.json({
            ok: true,
            user: deletedUser
        });
    });
});

module.exports = app;