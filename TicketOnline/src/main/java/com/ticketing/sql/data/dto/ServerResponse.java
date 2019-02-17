package com.ticketing.sql.data.dto;
// this method send a json to the web app to inform it that
// the request have been handled with the proper message.
public class ServerResponse {
    public ServerResponse(){

    }
    public ServerResponse(String text,int indicator){
        this.setText(text);
        this.setResponseIndicator(indicator);
    }
    private String text;

    //for front-end to tell which color to show if it's success or failed  message.
    private int responseIndicator;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
    //todo finish this with ticket flash to show green for created yellow for already taken.
    public int getResponseIndicator() {
        return responseIndicator;
    }

    public void setResponseIndicator(int responseIndicator) {
        this.responseIndicator = responseIndicator;
    }


}
