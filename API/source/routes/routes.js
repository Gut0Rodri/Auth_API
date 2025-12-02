const express = require('express');
const routes = express.Router();

const userControllers = require('../controllers/userController');

routes.get('/user/:username', userControllers.findUserByUsername);
routes.post('/user', userControllers.createAccount);
routes.patch('/user/:username', userControllers.changePassword);
routes.post('/user/login', userControllers.login);

module.exports = routes;