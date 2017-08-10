var express = require('express');
var app = express();
var _gemidao = require('./gemidao');
var gemidao = _interopRequireDefault(_gemidao.default);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/bot', function(request, response) {
  var token = request.body.token
  var de = request.body.de
  var para = request.body.para
  console.log(JSON.stringify(request.body))

  (0, gemidao.default)(request.body).then(function(){
    console.log('ok');
  }).catch(function(error) {
    console.log(error);
  })

  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(
    {
     "messages": [
       {"text": 'ok'}
      ]
    }
  ));


});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function execute(cmd, callback) {
  var spawn = require('child_process').spawn;
  var command = spawn(cmd);
  var result = '';

  command.stdout.on('data', function(data) {
     result += data.toString();
   });

  command.on('close', function(code) {
    return callback(result);
  });

  command.on('error', function (err) {
    console.log('error', err);
  });

}
