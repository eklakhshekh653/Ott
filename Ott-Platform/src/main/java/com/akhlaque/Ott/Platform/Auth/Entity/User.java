package com.akhlaque.Ott.Platform.Auth.Entity;

import java.security.PrivateKey;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.akhlaque.Ott.Platform.Auth.Enum.UserRole;
import com.akhlaque.Ott.Platform.Entity.PostVideo;
import jakarta.persistence.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;


@Data
@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "email",unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password")
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @JsonIgnore
    @Column(name = "User_Role")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "User_Reg_Time")
    private LocalDateTime registerTime;

    private List<Integer> history = new ArrayList<>();

    public void updatePassword(String newPassword, PasswordEncoder passwordEncoder) {
        // Hash the new password before setting it
        String hashedPassword = passwordEncoder.encode(newPassword);
        this.setPassword(hashedPassword);
    }


}

