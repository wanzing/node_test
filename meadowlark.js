var express = require('express');
var app = express();
var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
    "너 자신을 알라!",
    "얄리얄리 얄라셩 얄라리 얄라"
    ];
var handlebars = require('express3-handlebars')
    .create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
    // res.type('text/plain');
    // res.send('Meadowlark Travel');
    res.render('home');
});

app.get('/about', function( req, res) {
    // res.type('text/plain');
    // res.send('About Meadowlark Travel');
    var randomFortune= fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune});
});
app.get('/about/contact', function( req, res) {
    // res.type('text/plain');
    // res.send('Contact:');
    res.render('contact');
});

// Custom 404
app.use(function(req, res) {
    // res.type('text/plain');
    // res.status(404);
    // res.send('404 Not Found');
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    // res.type('text/plain');
    // res.status(500);
    // res.send('500 - Server Error');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

