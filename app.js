var express = require('express'),
mongoose = require('mongoose'),
body_parser = require('body-parser');

var app = express();

//add4
mongoose.connect(process.env.F11);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('database opened');
});

//add3
var emptySchema = new mongoose.Schema({}, { strict: false });
var Entry = mongoose.model('Entry', emptySchema);

app.use(express.static(__dirname + '/public'));
app.use('/jspsych-5.0.3', express.static(__dirname + "/jspsych-5.0.3"));
//add1
app.use(body_parser.json());


app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', function(request, response) {
    response.render('index.html');
});
app.get('/experiment', function(request, response) {
    response.render('experiment 9.html');
});

app.post('/experiment-data', function(request, response){
    Entry.create({
        "data":request.body
    });
    response.end();
})


var server = app.listen(process.env.PORT|| 3000, function(){
    console.log("Listening on port %d", server.address().port);
});
