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

routes.get("/post", async (req, res) => {
    const posts = await PostFile.find();
  
    return res.json(posts);
});
  

routes.post('/post', multer(multerConfig).single("file"),  async (req, res) => {
    const { originalname: name, size, key, location: url = "" } = req.file;

    const post = await PostFile.create({
        name,
        size,
        key,
        url
    });

    return res.json(post);
})

routes.delete("/post/:id", async (req, res) => {
    const post = await PostFile.findById(req.params.id);
  
    await post.remove();
  
    return res.send();
});


module.exports = routes