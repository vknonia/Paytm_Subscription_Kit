var checksum = require('../../model/checksum');
var config = require('../../config/config');
var http = require('http');
var request = require('request');
module.exports = function (app) {

 app.get('/renewsub', function(req,res){
console.log(" vidisha renew");
console.log("renew starts start ");
        
var paramList = new Array();
paramList["REQUEST_TYPE"] = 'RENEW_SUBSCRIPTION';
paramList["MID"] = config.MID;
paramList["ORDER_ID"] = "vidi569958";
paramList["SUBS_ID"] = '289524';
paramList["TXN_AMOUNT"] = '1';
///


//var SERVER = "https://pguat.paytm.com/oltp-web/processTransaction?"

 checksum.genchecksum(paramList,config.PAYTM_MERCHANT_KEY, function (err, result) 
        {
         console.log(result);
         result["CHECKSUMHASH"] =  encodeURIComponent(result["CHECKSUMHASH"]);
         console.log(result["CHECKSUMHASH"]);
         var finalstring = "";
          for (name in result)
        {
          finalstring = finalstring+name+"="+result[name]+"&";
        }
         console.log(finalstring);
         var SERVER = "https://pguat.paytm.com/oltp-web/processTransaction?"+finalstring
            request({
            url: SERVER, //URL to hit
            method: 'POST',
            }, function(error, response, body){
            if(error) {
                console.log(error);
            } else {
                console.log(response.statusCode, body);
                 var response = JSON.parse(body);
                 console.log(response);
                
            }
                });
        });
        console.log("POST Order end");
  });


  app.post('/renewsub',function(req, res) {
        console.log("POST Order end");

 });

};