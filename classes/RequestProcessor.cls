public with sharing class RequestProcessor {
   
    @AuraEnabled
    public static String getFeeds(){
       
        String strResponse = null;

        try{
            HttpRequest httpRequest = new HttpRequest();
            httpRequest.setEndpoint('https://api.androidhive.info/feed/feed.json');
            httpRequest.setMethod('GET');
            Http http = new Http();
            HttpResponse httpResponse = http.send(httpRequest);
            if(httpResponse.getStatusCode() == 200){
                strResponse = httpResponse.getBody();
            } else {
                throw new CalloutException(httpResponse.getBody());
            }

        } catch(Exception ex){
            throw ex;
        }
        return strResponse;
    }
}
