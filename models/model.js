const { DataTypes } = require('sequelize');
const sequelize = require("../data/db");

const Admin = sequelize.define("admin", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "User", allowNull: false },
});

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    profile_img: { type: DataTypes.STRING, allowNull: true },
    phone_num: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "User", allowNull: false },
});

const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name_tm: { type: DataTypes.STRING, allowNull: false }
});

const Contact = sequelize.define("contact", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    subject: { type: DataTypes.STRING, allowNull: false },
    comment: { type: DataTypes.STRING, allowNull: false },
});

const Document = sequelize.define("document", {
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    passport_pdf: { type: DataTypes.STRING, allowNull: false },
    checked: { type: DataTypes.TINYINT, allowNull: false, defaultValue: "0" },
});

const Address = sequelize.define("address", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    title_tm: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Salgyny giriziň!" }
        }
    },
    title_en: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Salgyny giriziň!" }
        }
    },
    title_ru: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Salgyny giriziň!" }
        }
    },
    phone_num: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Degişli operatoryň nomerini giriziň!" }
        }
    },
    open_time: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Iş wagtyny giriziň!" }
        }
    },
    close_time: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Iş wagtyny giriziň!" }
        }
    },
    latitude: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Koordinatasyny giriziň!" }
        }
    },
    longitude: {
        type: DataTypes.STRING, allowNull: false, validate: {
            notEmpty: { msg: "Koordinatasyny giriziň!" }
        }
    },
    checked: { type: DataTypes.TINYINT, allowNull: false, defaultValue: "0" }
});

Admin.findOrCreate({ where: { email: "admin@gmail.com", password: "$2b$10$ppLSj03K./oeMqaDKYEpTehMP5/Nxp5JzmppDXbygn/ReZMhwBe5W", role: "Admin" } })

Category.hasMany(Document, { onDelete: "cascade", onUpdate: "cascade" })
Document.belongsTo(Category)

User.hasMany(Document, { onDelete: "cascade", onUpdate: "cascade" })
Document.belongsTo(User)


module.exports = {
    Admin,
    Address,
    User,
    Category,
    Contact,
    Document
};
