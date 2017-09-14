package io.kandy.demo.rest;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import io.kandy.demo.rest.services.RestRequestService;



@Controller
public class RestController {

  // @GetMapping(path = "/products")
  // public String getProducts(Model model) {
  // model.addAttribute("products", Arrays.asList("ipad", "iphone"));
  // return "products";
  // }

  @Autowired
  RestRequestService restRequestService;

  @GetMapping(path = "/logout")
  public String logout(HttpServletRequest request) throws ServletException {
    request.logout();
    return "/";
  }

  @RequestMapping(value = "/execute_request", method = RequestMethod.POST)
  @ResponseBody
  public ResponseEntity<?> getResponse(@RequestBody RestRequestBody requestBody) {
    ResponseEntity<?> response = restRequestService.getResponse(requestBody);
//    String responseContent = (String) response.getBody();
//    RestResponse restResponse = new RestResponse();
//    restResponse.setContent(responseContent);
//    return new ResponseEntity<String>(restResponse.toString(), response.getStatusCode());
    return response;
  }

}
