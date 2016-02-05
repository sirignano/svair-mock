
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mock = require('./data/test1');


app.engine('.hbs', exphbs({defaultLayout: 'single', extname: '.hbs'}));
app.set('view engine', '.hbs');


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/secavis/faces/commun/index.jsf', function (req, res) {

  mock.layout = false;
  res.render('svair', mock);
});

app.use('/secavis', express.static('public'));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
