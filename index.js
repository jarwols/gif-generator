var express = require('express');
var path = require('path');
var bodyParser = require('body-parser'); 
var helper = require('sendgrid').mail
var sg = require('sendgrid')(process.env.SENDGRID_API);
var url = require('url'); 
var S3_API = process.env.S3_API;
var Filepicker = require('filepicker-node');
var filepicker = new Filepicker(process.env.FILEPICKER_API);
var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// views is directory for all template files
app.set('views', __dirname + '/views');
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/giffy', function(request, response) {
  var queryData = url.parse(request.url, true).query;
  response.render('pages/index', {
  	l: queryData.l, 
  	x: queryData.x, 
  	y: queryData.y, 
  	d: String(queryData.d),
    er: queryData.er
  });
});

app.post('/imagify', function(request, response) {
  from_email = new helper.Email("baylightsgif@gmail.com")
  to_email = new helper.Email(request.body.email)
  subject = "Bay Light #" + request.body.light + " shines for " + request.body.name;
  content = new helper.Content("text/html", "Exciting news! One of The Bay Lights has been dedicated in the name of " + request.body.name + ". </br> Follow this link to see the exact light: <a download href='" + S3_API + request.body.image +"'>Light #" + request.body.light + "</a></br><img src='" + S3_API + request.body.image + "' style='width: 100%; margin-top: 10px; margin-bottom: 10px;'/>");
  mail = new helper.Mail(from_email, subject, to_email, content);
  mail.setTemplateId('c2bfce22-7bad-4720-9a79-913dcf200d48');
  var req = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });
  sg.API(req, function(error, response) {
    if (error) {
      console.log('Error response received');
    }
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
  response.send("complete"); 
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




