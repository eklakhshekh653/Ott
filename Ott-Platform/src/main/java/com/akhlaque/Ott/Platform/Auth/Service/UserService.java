package com.akhlaque.Ott.Platform.Auth.Service;

import java.util.List;

import com.akhlaque.Ott.Platform.Auth.Dto.AdminDTO;
import com.akhlaque.Ott.Platform.Auth.Dto.CustomerDTO;
import com.akhlaque.Ott.Platform.Auth.Dto.UserDto;
import com.akhlaque.Ott.Platform.Auth.Entity.User;
import com.akhlaque.Ott.Platform.Auth.Exception.UserException;
import com.akhlaque.Ott.Platform.Entity.PostVideo;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.stereotype.Service;



@Service
public interface UserService {



    public User getUserByEmailId(String emailId)throws UserException;


    public User addUser(CustomerDTO customer)  throws UserException;

    public User addUserAdmin(AdminDTO admin	)  throws UserException;

    public User changePassword(Integer userId, UserDto customer)  throws UserException;


    public User getUserDetails(Integer userId)throws UserException;

    public List<User> getAllUserDetails() throws UserException;

    User findUserById(Integer userId);

}
