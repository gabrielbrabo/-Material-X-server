const UsersController = require( "./controllers/UsersController")
const SessionsController = require ("./controllers/SessionsController")
const auth = require ("./middlewares/auth")
const multer = require('multer')
const multerConfig = require('./config/multer')

const express = require('express')
const routes = express.Router()

routes.post('/register', UsersController.create)
routes.post('/sessions', SessionsController.create)

routes.use(auth)

routes.post('/post', multer(multerConfig).single("file"), (req, res) => {
    console.log(req.file)
    
    return res.json ({hello: "Gabriel"})
})


module.exports = routes