const express = require('express');
const shortid = require('shortid');

const db = require('../db')

const route = express.Router();

route.get('/', function (req, res) {
    res.render('transactions/index', {
        transactions: db.get("transactions").value()
    })
   });
route.get('/create', function (req, res) {
    res.render('transactions/create', {
        books: db.get('books').value(),
        users: db.get('users').value()
    });
   });
route.post('/create', function (req, res) {
  var name = req.body.name;
  var user = db.get('users').find({name: name}).value();
  var title = req.body.title;
  var book = db.get('books').find({title: title}).value();
  req.body.id = shortid.generate();
  req.body.userId = user.id;
  req.body.bookId = book.id;
  db.get('transactions').push(req.body).write();
  res.redirect('/transactions')
});

module.exports = route;