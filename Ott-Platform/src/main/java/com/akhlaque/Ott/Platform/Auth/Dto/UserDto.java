package com.akhlaque.Ott.Platform.Auth.Dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
public class UserDto {

    @NotBlank(message = "New password can not be Blank..")
    @NotNull
    @Size(min = 5,max = 10)
    private String newPassword;

}
