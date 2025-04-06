package com.akhlaque.Ott.Platform.Auth.Controller;

import com.akhlaque.Ott.Platform.Auth.Dto.UserSignInDetail;
import com.akhlaque.Ott.Platform.Auth.Exception.UserException;
import com.akhlaque.Ott.Platform.Auth.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ott")
public class LoginController {

    @Autowired
    private UserService userService;

    @GetMapping("/signIn")
    public ResponseEntity<UserSignInDetail> getLoggedInCustomerDetailsHandler(Authentication auth) {
        try {var customer = userService.getUserByEmailId(auth.getName());
            UserSignInDetail signinSuceesData = new UserSignInDetail();
            signinSuceesData.setId(customer.getUserId());
            signinSuceesData.setFirstNAme(customer.getFirstName());
            signinSuceesData.setLastName(customer.getLastName());

            return new ResponseEntity<>(signinSuceesData, HttpStatus.OK);}
        catch(UserException ex ){
            throw new UserException(" Invalid Password");
        }

    }


}
