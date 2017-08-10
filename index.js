var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/bot', function(request, response) {
  execute('./node_modules/.bin/gemidao-do-zap --version')
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({ a: 1 }));

});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function execute(command) {
  const { exec } = require('child_process');
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
    });

}
