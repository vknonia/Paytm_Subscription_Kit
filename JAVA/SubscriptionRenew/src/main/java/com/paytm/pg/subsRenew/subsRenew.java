package com.paytm.pg.subsRenew;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Set;
import java.util.TreeMap;

import com.paytm.pg.merchant.CheckSumServiceHelper;

public class subsRenew {
	public static String paytmPGStagingUrl = "https://securegw-stage.paytm.in/theia/processTransaction";
	public static String paytmPGProdUrl = "https://securegw.paytm.in/theia/processTransaction";
	public static String paytmMerchantID = "";//"";
	public static String paytmMerchantKey = "";//"xxxxxxxxxxxxxxxx";
	public static String promoCode = "";
	
    public static String getRequest() throws Exception {
    	String Res ="";
    	TreeMap <String,String> paramMap = new TreeMap <String,String>();
    	
    	paramMap.put("REQUEST_TYPE", "RENEW_SUBSCRIPTION");
    	paramMap.put("MID", paytmMerchantID);
    	paramMap.put("ORDER_ID", "ORv09008ffjhj787711");
    	paramMap.put("SUBS_ID", "1002410");
    	paramMap.put("TXN_AMOUNT", "40");
    	
    	String CHECKSUMHASH = URLEncoder.encode(CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum(paytmMerchantKey, paramMap),"UTF-8");
		System.out.println(CHECKSUMHASH);
		paramMap.put("CHECKSUMHASH", CHECKSUMHASH);
		
		Set<String> keys = paramMap.keySet();
		
		StringBuilder requestStr = new StringBuilder();
		
        for(String key: keys){
            
            requestStr.append(key);
            requestStr.append("=");
            requestStr.append(paramMap.get(key));
            requestStr.append("&");
        }
        Res = requestStr.substring(0, requestStr.length() - 1);
        
        System.out.println(Res);
    	return Res;
    }
    
    
    public static String RenewRequest(String targetURL) throws Exception {
    	HttpURLConnection connection = null;
		URL url = new URL(targetURL);
		String requestBody = getRequest();

		connection = (HttpURLConnection)url.openConnection();
		connection.setRequestMethod("POST");

		
                   
		try {	
			connection = (HttpURLConnection) url.openConnection();
			//connection.setRequestProperty("Content-Type","text/html");
	        connection.setRequestProperty("Content-Length", Integer.toString(requestBody.getBytes().length));
            connection.setUseCaches(false);
			connection.setDoOutput(true);
			
            DataOutputStream wr = new DataOutputStream (connection.getOutputStream());
			wr.writeBytes(requestBody);
			wr.close();
		
			InputStream is;
			try{
				is = connection.getInputStream();
			}catch(Exception e){
				is = connection.getErrorStream();
			}
			
			BufferedReader rd = new BufferedReader(new InputStreamReader(is));
			int statusCode = connection.getResponseCode();
			System.out.println("The http header code is = " +statusCode);         
			StringBuilder response = new StringBuilder();
			String line="";
			while((line = rd.readLine()) != null) {
				response.append(line);
				response.append('\r');
			}
			rd.close();
            System.out.println("This is response string= " +response);
            return response.toString();
		} catch (Exception e) {
			System.out.println("This is response string= " +e.getMessage());
		}  finally {
			if(connection != null) {
				connection.disconnect(); 
			}
		}
		return "";
	}


    public static void main( String[] args ) throws Exception
    {
    	RenewRequest(paytmPGProdUrl);
    }

}
