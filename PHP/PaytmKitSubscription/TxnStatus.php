<?php
header("Pragma: no-cache");
header("Cache-Control: no-cache");
header("Expires: 0");

// following files need to be included
require_once("./lib/config_paytm.php");
require_once("./lib/encdec_paytm.php");

$ORDER_ID = "";
$requestParamList = array();
$responseParamList = array();


$requestParamList = array("MID" => PAYTM_MERCHANT_MID , "ORDERID" => "243a4f59c32a1ab7c0dc");  
$url = "https://secure.paytm.in/oltp/HANDLER_INTERNAL/TXNSTATUS";
$data_string = "JsonData=".json_encode($requestParamList);

$ch = curl_init();  // initiate curl
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_POST, 1);  // tell curl you want to post something
curl_setopt($ch, CURLOPT_POSTFIELDS,$data_string); // define what you want to post
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // return the output in string format
//curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);     
//curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);    
//curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$output = curl_exec ($ch); // execute
$info = curl_getinfo($ch);

echo '<br/><br/>';
print_r($info);
echo '<br/><br/>';
echo $output;
	

?>