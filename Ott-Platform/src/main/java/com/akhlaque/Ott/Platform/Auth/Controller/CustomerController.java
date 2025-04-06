package com.akhlaque.Ott.Platform.Auth.Controller;

import java.util.List;

import com.akhlaque.Ott.Platform.Auth.Dto.CustomerDTO;
import com.akhlaque.Ott.Platform.Auth.Dto.UserDto;
import com.akhlaque.Ott.Platform.Auth.Entity.User;
import com.akhlaque.Ott.Platform.Auth.Exception.UserException;
import com.akhlaque.Ott.Platform.Auth.Service.UserService;
import jdk.jshell.spi.ExecutionControl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ott/customers")
public class CustomerController {

    @Autowired
    private final UserService userService;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@Valid @RequestBody CustomerDTO user) throws UserException{

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User addedUser = userService.addUser(user);
        return ResponseEntity.ok(addedUser);
    }

    @PutMapping("/api/update-password/{customerId}")
    public ResponseEntity<User> updateUserPassword(@PathVariable("customerId") Integer customerId,
                                                   @Valid @RequestBody UserDto userdto) {
        User updatedUser = userService.changePassword(customerId, userdto);
        return ResponseEntity.ok(updatedUser);
    }


    @GetMapping("/api/{userId}")
    public ResponseEntity<User> getUserDetails(@PathVariable Integer userId) {
        User user = userService.getUserDetails(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/api/get-all-customer")
    public ResponseEntity<List<User>> getAllUserDetails() {
        List<User> users = userService.getAllUserDetails();
        return ResponseEntity.ok(users);
    }

}
