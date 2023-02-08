const UsersController = require( "./controllers/UsersController")
const SessionsController = require ("./controllers/SessionsController")
const auth = require ("./middlewares/auth")

const express = require('express')
const routes = express.Router()

routes.post('/register', UsersController.create)
routes.post('/sessions', SessionsController.create)

routes.use(auth)


module.exports = routes