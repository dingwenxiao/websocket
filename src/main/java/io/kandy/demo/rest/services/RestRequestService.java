package io.kandy.demo.rest.services;

import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.kandy.demo.rest.RestRequestBody;

@Service
public class RestRequestService {

  private RestTemplate restTemplate = new RestTemplate();
  private ObjectMapper mapper = new ObjectMapper();


  public ResponseEntity<?> getResponse(RestRequestBody requestBody) {
    String method = requestBody.getMethod();
    String url = requestBody.getUrl();
    Map<String,String> headers = requestBody.getHeaders();
    String body = requestBody.getData();

    HttpEntity<?> requestEntity = null;
    final HttpHeaders httpHeaders;

    if (headers != null && !headers.isEmpty()) {
        httpHeaders = new HttpHeaders();

        headers.forEach((headerName, headerValue) -> {
          httpHeaders.set(headerName, headerValue);
        });

        if (body != null && !body.isEmpty()) {
          requestEntity = new HttpEntity<Object>(body, httpHeaders);
        } else {
          requestEntity = new HttpEntity<Object>(httpHeaders);
        }

    } else if (body != null && !body.isEmpty()) {
      requestEntity = new HttpEntity<Object>(body);
    }

    ResponseEntity<?> response = null;
    try {
      response = restTemplate.exchange(url, HttpMethod.resolve(method.toUpperCase()), requestEntity,
          String.class);
    } catch (Exception e) {
      e.printStackTrace();;
    }
    return response;
  }


}
