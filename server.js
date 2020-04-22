// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const pug =  require('pug')
app.set('view engine', 'pug')
app.set('views', './views')
// https://expressjs.com/en/starter/basic-routing.html
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
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
