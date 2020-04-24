const express = require('express');
const shortid = require('shortid');

const db = require('../db')
const controller = require('../controllers/users.controller')

const route = express.Router();
route.get('/', controller.index)
route.get('/create', controller.create )
route.post('/create', controller.postCreate)
route.get('/delete/:id', controller.delete )
route.post('/update/:id', controller.postUpdate)
route.get('/update/:id', controller.update)

module.exports = route;
