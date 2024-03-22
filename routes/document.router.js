const express = require('express');
const { isAdmin, validateToken } = require('../middlewares/authMiddleware');
const router = express.Router();
const { Category, Document, User } = require("../models/model");
const FileUpload = require("../helpers/file-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
const path = require("path")
const fs = require('fs')

router.get("/", isAdmin, async (req, res) => {
    await Document.findAll({
        include: {
            model: Category, 
            model:User
        }
    }).then((document) => { res.json({ document: document }) })
})

/// Kategoryyalaryy cekmeli su api bilen

router.get("/create", async (req, res) => {
    await Category.findAll().then((category) => { res.json({ category: category }) })
})

router.post("/create", FileUpload.upload.single("passport_pdf"), validateToken, async (req, res) => {
    await Document.create({
        username: req.body.username,
        email: req.body.email,
        phone_num: req.body.phone_num,
        title: req.body.title,
        description: req.body.description,
        passport_pdf: req.file.filename,
        categoryId: req.body.categoryId,
        userId: req.user.id
    }).then(() => {
        res.json({ success: "Hasaba alyndynyz" })
    }).catch((error) => { res.status(500).json({ error: error }) })
});

// adminda checkedi calysmaly

router.get("/edit/:documentId", isAdmin, async (req, res) => {
    await Document.findOne({ where: { id: req.params.documentId } }).then((document) => {
        res.json({
            document: document
        })
    })
});

router.post("/edit/:documentId", isAdmin, async (req, res) => {
    await Document.update({
        checked: req.body.checked
    }, { where: { id: req.params.documentId } })
        .then(() => { res.json({ success: "Üstünlikli üýtgedildi" }) })
        .catch((error) => { res.status(500).json({ error: error }) })
});

router.delete("/delete/:documentId", isAdmin, async (req, res) => {
    await Document.findOne({ where: { id: req.params.documentId } }).then((document) => {
        if (document) {
            document.destroy()
            return res.json({ success: "Üstünlikli pozuldy" })
        } else { res.json({ error: "Tapylmady" }) }
    })
});

//egerde user oz document registrasiyasyny ayyrtmak islese

router.delete("/user/delete/:documentId", validateToken, async (req, res) => {
    await Document.findOne({
        where: {
            id: req.params.documentId,
            userId: req.user.id
        }
    }).then((document) => {
        if (document) {
            document.destroy()
            return res.json({ success: "Hasapdan cykdynyz" })
        } else { res.json({ error: "Tapylmady" }) }
    })
});


module.exports = router;