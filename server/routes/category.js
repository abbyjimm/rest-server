const express = require('express');
let { verifyToken, verifyAdminRole } = require('../middlewares/authentication');
let app = express();
let Category = require('../models/category.js');

/**
 * Function to show all categories
 * @author Abigail Jimenez
 * @since 2019-08-25
 */
app.get('/category', verifyToken, (req, res) => {
    Category.find({}, 'description user')
        .exec((err, categories) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Category.count({}, (err, count) => {
                res.json({
                    ok: true,
                    categories,
                    rows: count
                });
            })

        });
});

/**
 * Function to show one category by ID
 * @author Abigail Jimenez
 * @since 2019-08-25
 */
app.get('/category/:id', (req, res) => {
    let id = req.params.id;
    Category.findById(id)
        .exec((err, categories) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Category.count({}, (err, count) => {
                res.json({
                    ok: true,
                    categories,
                    rows: count
                });
            })

        });
});

/**
 * Create new category
 * @author Abigail Jimenez
 * @since 2019-08-25
 */
app.post('/category', verifyToken, (req, res) => {
    //return new category
    //req.user._id
    let body = req.body;
    let category = new Category({
        description: body.description,
        user: req.user._id
    });

    category.save((err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });
    });
});

/**
 * update a category
 * @author Abigail Jimenez
 * @since 2019-08-25
 */
app.put('/category/:id', [verifyToken], (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategory = {
        description: body.description
    };

    Category.findOneAndUpdate(id, descCategory, { new: true, runValidators: true }, (err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });
    });
});

/**
 * delete a category
 * @author Abigail Jimenez
 * @since 2019-08-25
 */
app.delete('/category/:id', [verifyToken, verifyAdminRole], (req, res) => {
    let id = req.params.id;
    Category.findByIdAndRemove(id, (err, deletedCategory) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!deletedCategory) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Category not found'
                }
            });
        }

        res.json({
            ok: true,
            user: deletedCategory
        });
    });
});

module.exports = app;