
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const results = require('./data/results');
const bodyParser = require('body-parser');

app.engine('.hbs', exphbs({defaultLayout: 'single', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/secavis/faces/commun/index.jsf', function (req, res) {
  const numFiscal = req.body["j_id_7:spi"]
  const referenceAvis = req.body["j_id_7:num_facture"]
  const id = numFiscal + "+" + referenceAvis
  const data = results[id];
  if(data) {
    data.layout = false;
    res.render('svair', data );
  } else {
    res.render('missing', { layout: false } );

  }
});

app.use('/secavis', express.static('public'));


const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
  console.log('Example app listening on port %s!', PORT);
});
