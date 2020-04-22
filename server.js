const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const pug =  require('pug')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

app.set('view engine', 'pug')
app.set('views', './views')
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

db.defaults({todos:[]}).write();
app.get("/", (request, response) => {
  response.send("I love CodersX");
});
app.get('/todos', (req, res) => {
  res.render('index', {
    todos: db.get('todos').value()
  })
});
app.get('/todos/search', (req, res) => {
  var q = req.query.q;
  var matchedTodos= db.get('todos').value().filter(function(todo){
    return todo.action.toLowerCase().indexOf(q.toLowerCase()) !== -1
  });
  res.render('index', {
    todos: matchedTodos
  });
});
app.get('/todos/create', function(req, res){
    res.render('create')
});
app.get('/todos/:id', function(req, res){
    var id = parseInt(req.params.id);
    var todo = db.get('todos').find({id: id}).value();
    db.get('todos').remove(todo).write()
    res.render('index', {
      todos:  db.get('todos').value()
    });
    res.redirect('/todos');
});


app.post('/todos/create', function(req, res){
    db.get('todos').push(req.body).write();
    res.redirect('/todos')
})
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
