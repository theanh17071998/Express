var express = require('express');
var app = express();
var low = require('lowdb')
var shortid = require('shortid');
var FileSync = require('lowdb/adapters/FileSync')

var adapter = new FileSync('db.json')
var db = low(adapter)

var bodyParser = require('body-parser')
var port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

app.get('/', function (req, res) { 
    res.send("<h1>Hello coder.Tokyo</h1>");
 })
db.defaults({"books": []}).write();
 
app.get('/books', function (req, res) {
     res.render('index', {
         books: db.get("books").value()
     })
    });
app.get('/books/update/:id', function(req, res){ 
    var id = req.params.id; 
    var book = db.get('books').find({id: id}).value()
    db.get('books').find(book)
    .assign({ title: 'Năng và gió'})
    .write()
    res.redirect('/books')
});
app.get('/books/delete/:id', function(req, res){
  
    var id = req.params.id; 
    var book = db.get('books').find({id: id}).value()
    db.get('books')
    .remove(book)
    .write()
    res.redirect('/books')
});
app.get('/books/create', function (req, res) {
    res.render('books/create')
  }) 

app.post('/books/create', function (req, res) {
    req.body.id = shortid.generate();
    db.get("books").push(req.body).write();  
    res.redirect('/books'); 
   
})

// users

app.get('/users', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
})
app.get('/users/create', (req, res) => {
    res.render('users/create')
})
app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
})
app.get('/users/delete/:id', (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    db.get('users').remove(user).write();
    res.redirect('/users')
})
app.post('/users/update/:id', (req,res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    db.get('users').find(user).assign({name: req.body.name, phone: req.body.phone }).write();
    res.redirect('/users')
})
app.get('/users/update/:id', (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    // db.get('users').find(user).assign({name: 'Nguyen Van A'}).write();
    var userEdit = {};
    userEdit.name = user.name
    userEdit.phone = user.phone
    res.render('users/update', {
        user: userEdit
    })
})

app.listen(port, function(){
    console.log('server running with port' + port);
});
