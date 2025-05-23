package com.akhlaque.Ott.Platform.Auth.Controller;

import com.akhlaque.Ott.Platform.Auth.Dto.AdminDTO;
import com.akhlaque.Ott.Platform.Auth.Dto.UserDto;
import com.akhlaque.Ott.Platform.Auth.Entity.User;
import com.akhlaque.Ott.Platform.Auth.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/ott/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody AdminDTO user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User addedUser = userService.addUserAdmin(user);
        return ResponseEntity.ok(addedUser);
    }

    @PutMapping("/updatepassword/{adminId}")
    public ResponseEntity<User> updateUserPassword(@PathVariable("adminId") Integer customerId, @RequestBody UserDto userdto) {
        User updatedUser = userService.changePassword(customerId, userdto);
        return ResponseEntity.ok(updatedUser);
    }


}
