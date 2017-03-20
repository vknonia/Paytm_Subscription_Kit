var checksum = require('../../model/checksum');
var config = require('../../config/config');
var http = require('http');
var request = require('request');
module.exports = function (app) {

 app.get('/check_status', function(req,res){
console.log(" vidisha check status get");
res.render('check_status.ejs',{'config' : config,'flag': 'false'});
  });


  app.post('/check_status',function(req, res) {
       console.log("Check status start ");
        var paramlist = req.body;
        var paramarray = {};
        console.log(paramlist);
        for (name in paramlist)
        {
             if(name == 'SERVER')
            {
              var SERVER = paramlist[name] ;
            }
            else
            {
            paramarray[name] = paramlist[name] ;
            }
        }
        var reqcheck = JSON.stringify(paramarray);
           var finalstring = "JsonData=" + JSON.stringify(paramarray);
        if(SERVER == 'live')
        {
          var url = config.PAYTM_PROD_URL + '/oltp/HANDLER_INTERNAL/TXNSTATUS?'+finalstring;
        }else
        {
          var url = config.PAYTM_STAG_URL + '/oltp/HANDLER_INTERNAL/TXNSTATUS?'+finalstring;
        }
        console.log(url);
           console.log(finalstring);
            request({
            url: url , //URL to hit
          //  qs: finalstring, //Query string data
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                     },
            body: finalstring//Set the body as a string
            }, function(error, response, body){
            if(error) {
                console.log(error);
            } else {
                console.log(response.statusCode, body);
                 var response = JSON.parse(body);
                 console.log(response.MID);
               res.render('check_status.ejs',{'response' : response,'jsonres' : body, 'flag': 'true','config' : config,'reqcheck':reqcheck , 'url':url});
                   //res.send(body);
            }
                });
        console.log("POST Order end");

 });

};