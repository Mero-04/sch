const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const morgan = require('morgan')
const cors = require("cors");
const sequelize = require('./data/db');


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors());
app.use(morgan('tiny'));
app.use('/api', express.static('public'))

const HomeRouter = require("./routes/home.router")
const AuthRouter = require("./routes/auth.router")
const AddressRouter = require("./routes/address.router")
const CategoryRouter = require("./routes/category.router")
const UserRouter = require("./routes/user.router")
const ContactRouter = require("./routes/contact.router")
const DocumentRouter = require("./routes/document.router")


app.use("/api/v1/home", HomeRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/address", AddressRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/contact", ContactRouter);
app.use("/api/v1/document", DocumentRouter);


app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})