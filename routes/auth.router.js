const express = require('express');
const router = express.Router();
const { Admin, User } = require('../models/model');
const { sign } = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { validateToken } = require("../middlewares/authMiddleware");

router.post("/rootman", async (req, res) => {
    const { email, password } = req.body;
    await Admin.findOne({ where: { email: email } })
        .then(admin => {
            if (!admin || admin.email !== email) {
                res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, admin.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
                } else {
                    res.json({
                        token: sign({ id: admin.id, role: admin.role }, process.env.JWT_key, {
                            expiresIn: '24h'
                        })
                    });
                }
            }
        })
});

router.post("/login", async (req, res) => {
    const { phone_num, password } = req.body;
    await User.findOne({ where: { phone_num: phone_num } })
        .then(user => {
            if (!user || user.phone_num !== phone_num) {
                res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogsry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, user.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
                } else {
                    res.json({
                        token: sign({ id: user.id, username: user.username, phone_num: user.phone_num, role: user.role, }, process.env.JWT_key, {
                            expiresIn: '24h'
                        })
                    });
                }
            }
        })
});


router.post("/register", async (req, res) => {
    const { username, phone_num, password } = req.body;
    if (!(username && phone_num && password)) {
        res.json({ error: "Ahli oyjukleri doldurun" });
    }
    const user = await User.findOne({ where: { phone_num: phone_num } });
    if (!user) {
        try {
            const user = await User.create({
                username: username,
                phone_num: phone_num,
                password: await bcrypt.hash(password, 10)
            });
            res.json({
                success: "Hasaba alyndy", token: sign(
                    { id: user.id, username: user.username, phone_num: user.phone_num, role: user.role, }, process.env.JWT_key
                )
            });
        }
        catch (err) {
            console.log(err)
        }
    } else {
        res.json({ error: "Sizin nomeriniz bilen on hasap acylypdyr" })
    }
})

router.get("/current_user", validateToken, async (req, res) => {
    // res.json(req.user)
    await User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.user.id }
    }).then((user) => {
        res.json({ user: user })
    })
});


module.exports = router;