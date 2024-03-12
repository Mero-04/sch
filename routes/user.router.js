const express = require("express");
const { User } = require("../models/model");
const { isAdmin, validateToken } = require("../middlewares/authMiddleware");
const router = express.Router();
const imageUpload = require("../helpers/file-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
const path = require("path")
const fs = require('fs')

router.get("/", isAdmin, async (req, res) => {
    await User.findAll().then((users) => { res.json({ users: users }) })
})


router.get("/single", validateToken, async (req,res)=>{
    await User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.user.id }
    }).then((user) => {
        res.json({ user: user })
    })
})


router.get("/edit/:userId", async (req, res) => {
    await User.findOne({
        where: { id: req.params.userId }
    }).then((user) => {
        res.json({ user: user });
    }).catch((err) => {
        res.status(500).json(err)
    })
})

router.get("/edit/:userId", imageUpload.upload.single("profile_img"), async (req, res) => {
    let img = req.body.profile_img;
    if (req.file) {
        fs.unlink("./public/img/users/" + img, err => {
            console.log(err);
        })
    }
    await User.findOne({ where: { id: req.params.userId } })
        .then((user) => {
            if (user) {
                user.surname = req.body.surname,
                    user.email = req.body.email,
                    user.profile_img = req.file.filename
                user.save();
                return res.json({ success: "Maglumatlarynyz üstünlikli gosuldy" })
            } else {
                res.json({ error: "Ulanyjy tapylmady" })
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})



module.exports = router;