const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const pug =  require('pug')

app.set('view engine', 'pug')
app.set('views', './views')
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

var todos = [
  {action: 'Đi chợ'},
  {action: 'Nấu cơm'},
  {action: 'Rửa bát'},
  {action: 'Học code tại codersX'}
]
app.get("/", (request, response) => {
  response.send("I love CodersX");
});
app.get('/todos', (req, res) => {
  res.render('index', {
    todos: todos
  })
});
app.get('/todos/search', (req, res) => {
  var q = req.query.q;
  var matchedTodos= todos.filter(function(todo){
    return todo.action.toLowerCase().indexOf(q.toLowerCase()) !== -1
  });
  res.render('index', {
    todos: matchedTodos
  });
});
app.get('/todos/create', function(req, res){
    res.render('create')
});
app.post('/todos/create', function(req, res){
    todos.push(req.body);
    res.redirect('/todos')
})
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
