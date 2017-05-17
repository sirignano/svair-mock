
const express = require('express');
const morgan = require('morgan')
const app = express();
const exphbs = require('express-handlebars');
const results = require('./data/results');
const bodyParser = require('body-parser');
const path = require('path')

app.engine('.hbs', exphbs({defaultLayout: 'single', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/secavis/faces/commun/index.jsf', function (req, res) {
  const numFiscal = req.body["j_id_7:spi"]
  const referenceAvis = req.body["j_id_7:num_facture"]
  const id = numFiscal + "+" + referenceAvis
  const defaultData = {
    anneeImpots: '2015',
    anneeRevenus: '2014'
  }
  const data = Object.assign(defaultData, results[id])
  if(data) {
    data.layout = false;
    res.render('svair', data );
  } else {
    res.render('missing', { layout: false } );

  }
});

app.use('/secavis', express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
  console.log('Example app listening on port %s!', PORT);
});
