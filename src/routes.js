const UsersController = require( "./controllers/UsersController")
const SessionsController = require ("./controllers/SessionsController")
const auth = require ("./middlewares/auth")
const multer = require('multer')
const multerConfig = require('./config/multer')
const PostFile = require("./models/PostFiles");

const express = require('express')
const routes = express.Router()

routes.post('/register', UsersController.create)
routes.post('/sessions', SessionsController.create)

routes.use(auth)

routes.post('/post', multer(multerConfig).single("file"),  async (req, res) => {
    const { originalname: name, size, key, location: url = "" } = req.file;

    const post = await PostFile.create({
        name,
        size,
        key,
        url: '',
    });

    return res.json(post);
})


module.exports = routes