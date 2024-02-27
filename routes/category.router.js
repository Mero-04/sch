const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const { Category } = require("../models/model");


router.get("/", isAdmin, async (req, res) => {
    await Category.findAll().then((category) => { res.json({ category: category }) })
})

router.post("/create", isAdmin, async (req, res) => {
    await Category.create({
        name_tm: req.body.name_tm
    }).then(() => {
        res.json({ success: "Kategoriya üstünlikli goşuldy" })
    }).catch((error) => { res.status(500).json({ error: error }) })
});

router.get("/edit/:categoryId", isAdmin, async (req, res) => {
    await Category.findOne({ where: { id: req.params.categoryId } }).then((category) => {
        res.json({ category: category })
    })
});

router.post("/edit/:categoryId", isAdmin, async (req, res) => {
    await Category.update({
        name_tm: req.body.name_tm
    }, { where: { id: req.params.categoryId } })
        .then(() => { res.json({ success: "Üstünlikli üýtgedildi" }) })
        .catch((error) => { res.status(500).json({ error: error }) })
});

router.delete("/delete/:categoryId", isAdmin, async (req, res) => {
    await Category.findOne({ where: { id: req.params.categoryId } }).then((category) => {
        if (category) {
            category.destroy()
            return res.json({ success: "Üstünlikli pozuldy" })
        } else { res.json({ error: "Tapylmady" }) }
    })
});

module.exports = router;