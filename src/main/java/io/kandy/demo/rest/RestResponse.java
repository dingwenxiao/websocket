package io.kandy.demo.rest;

public class RestResponse {

  private String content;

  private Integer responseCode;

  public Integer getResponseCode() {
    return responseCode;
  }

  public void setResponseCode(Integer responseCode) {
    this.responseCode = responseCode;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }


  @Override
  public String toString() {
    return "{\"statusCode:\"" + responseCode + ", \"content\": \"" + content + "\"}";
  }
}
