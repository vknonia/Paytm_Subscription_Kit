var checksum = require('../../model/checksum');
var config = require('../../config/config');

module.exports = function (app) {

 app.get('/subcription', function(req,res){
console.log("--------js----");
res.render('subcription.ejs',{'config' : config});
  });


  app.post('/subcription',function(req, res) {
        console.log("POST Order start");
        var paramlist = req.body;
        console.log(paramlist);
        var SERVER = 'test';
        if(SERVER == 'live')
        {
          var url = 'https://securegw.paytm.in/theia/processTransaction';
        }else
        {
          var url = 'https://securegw-stage.paytm.in/theia/processTransaction';
        }
        
        console.log(config.PAYTM_STAG_URL);
        console.log(url);
        paramlist['CALLBACK_URL'] = 'http://localhost:3000/response'; 
        checksum.genchecksum(paramlist, config.PAYTM_MERCHANT_KEY, function (err, result) 
        {
              console.log(result);
           res.render('pgredirect.ejs',{ 'restdata' : result,'url': url});
        });

        console.log("POST Order end");

 });

};
