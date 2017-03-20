<?php
header("Pragma: no-cache");
header("Cache-Control: no-cache");
header("Expires: 0");

// following files need to be included
require_once("./lib/config_paytm.php");
require_once("./lib/encdec_paytm.php");

$checkSum = "";
$paramList = array();

$paramList["REQUEST_TYPE"] = 'RENEW_SUBSCRIPTION';
$paramList["MID"] = PAYTM_MERCHANT_MID;
$paramList["ORDER_ID"] = "OrderRenewTest00000000001";
$paramList["SUBS_ID"] = '1002410';
$paramList["TXN_AMOUNT"] = '40';

$checkSum = getChecksumFromArray($paramList,PAYTM_MERCHANT_KEY);
$paramList["CHECKSUMHASH"] = $checkSum;

foreach ( $paramList as $key => $value) 
{
    $post_items[] = $key . '=' . $value;
}
$post_string = implode ('&', $post_items);
echo $post_string."<br/><br/>";


$url = PAYTM_TXN_URL; // where you want to post data

$ch = curl_init();  // initiate curl
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_POST, true);  // tell curl you want to post something
curl_setopt($ch, CURLOPT_POSTFIELDS,$post_string); // define what you want to post
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // return the output in string format
$output = curl_exec ($ch); // execute
$info = curl_getinfo($ch);
echo $output."<br/><br/>";
print_r($info)."<br/><br/>";

$data = json_decode($output, true);





?>