const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "profile_img") {
            cb(null, './public/img/profile_img/');
        }
        else if (file.fieldname === "passport_pdf") {
            cb(null, './public/file/passport_pdf/');
        }
    },
    filename: function (req, file, cb) {
        // if (file.fieldname ==="news_img"){
        //     cb(null, path.parse(file.fieldname).name + "_" + path.parse(file.originalname).name + path.extname(file.originalname));
        // }
        cb(null, path.parse(file.fieldname).name + "_" + path.parse(file.originalname).name + path.extname(file.originalname));

    }
});

const upload = multer({
    storage: storage
});

module.exports.upload = upload;