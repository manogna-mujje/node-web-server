const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.url}, ${req.method}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err)
    {
      console.log('Unable to append server.log')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    tabTitle: 'Home',
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website.'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    tabTitle:'About Us',
    pageTitle: 'About our company',
  });
})

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to handle request!'
  });
})

app.listen(3000, () => {
  console.log('Server is up and running on port 3000');
});

//  res.send('<h1>Hello Express!</h1>');
/**
res.send({
  name: 'Manogna',
  age: 26,
  likes: [
    'travelling',
    'excellence'
  ]
});**/
