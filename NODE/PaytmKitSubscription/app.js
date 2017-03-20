
var express = require("express") , http = require('http')
  , path = require('path')
  , util = require('util')
  , redirect = require("express-redirect");
 
var app = express();
redirect(app); 
var router = express.Router();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

server.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});

app.use(router);

require('./routes/admin/check_status')(app);
require('./routes/admin/pgredirect')(app);
require('./routes/admin/response')(app);
require('./routes/admin/subcription')(app);
require('./routes/admin/renewsub')(app);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
