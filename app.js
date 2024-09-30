const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let todoList = ['Buy groceries', 'Walk the dog'];

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Render the TODO list
app.get('/', (req, res) => {
  res.render('index', { todoList });
});

// Add a new TODO item
app.post('/add', (req, res) => {
  const newItem = req.body.newItem;
  if (newItem) {
    todoList.push(newItem);
  }
  res.redirect('/');
});

// Delete an item (optional)
app.post('/delete', (req, res) => {
  const index = req.body.index;
  if (index >= 0) {
    todoList.splice(index, 1);
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`TODO app listening on port ${port}`);
});
