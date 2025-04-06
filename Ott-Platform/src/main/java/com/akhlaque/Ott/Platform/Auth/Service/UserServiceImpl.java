package com.akhlaque.Ott.Platform.Auth.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.akhlaque.Ott.Platform.Auth.Dto.AdminDTO;
import com.akhlaque.Ott.Platform.Auth.Dto.CustomerDTO;
import com.akhlaque.Ott.Platform.Auth.Dto.UserDto;
import com.akhlaque.Ott.Platform.Auth.Entity.User;
import com.akhlaque.Ott.Platform.Auth.Enum.UserRole;
import com.akhlaque.Ott.Platform.Auth.Exception.UserException;
import com.akhlaque.Ott.Platform.Auth.Repository.UserRepository;
import com.akhlaque.Ott.Platform.Auth.Service.UserService;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUserByEmailId(String emailId) throws UserException {
        return userRepository.findByEmail(emailId).orElseThrow(() -> new UserException("User not found"));

    }

    @Override
    public User addUser(CustomerDTO customer) throws UserException {
        if (customer == null)
            throw new UserException("customer Can not be Null");
        Optional<User> findByEmail = userRepository.findByEmail(customer.getEmail());
        if (findByEmail.isPresent()) {
            System.out.println("inside add user method");
            throw new RuntimeException("Email alredy Register");
        }

        User newCustomer = new User();
        newCustomer.setEmail(customer.getEmail());
        newCustomer.setPassword(customer.getPassword());
        newCustomer.setFirstName(customer.getFirstName());
        newCustomer.setLastName(customer.getLastName());
        newCustomer.setPhoneNumber(customer.getPhoneNumber());
        newCustomer.setRole(UserRole.ROLE_USER);
        newCustomer.setRegisterTime(LocalDateTime.now());

        return userRepository.save(newCustomer);
    }

    @Override
    public User addUserAdmin(AdminDTO customer) throws UserException {
        if (customer == null)
            throw new UserException("admin Can not be Null");
        Optional<User> findByEmail = userRepository.findByEmail(customer.getEmail());
        if (findByEmail.isPresent()) {
            System.out.println("inside add user method");
            throw new RuntimeException("Email alredy Register");
        }
        User newAdmin = new User();
        newAdmin.setEmail(customer.getEmail());
        newAdmin.setPassword(customer.getPassword());
        newAdmin.setFirstName(customer.getFirstName());
        newAdmin.setLastName(customer.getLastName());
        newAdmin.setPhoneNumber(customer.getPhoneNumber());
        newAdmin.setRole(UserRole.ROLE_ADMIN);
        newAdmin.setRegisterTime(LocalDateTime.now());

        return userRepository.save(newAdmin);
    }

    public User changePassword(Integer userId, UserDto customer) throws UserException {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException("User not found"));
        if (customer.getNewPassword().length() >= 5 && customer.getNewPassword().length() <= 10) {
            user.updatePassword(customer.getNewPassword(), passwordEncoder);
            return userRepository.save(user);
        } else {
            throw new UserException("provide valid  password");
        }

    }



    @Override
    public User getUserDetails(Integer userId) throws UserException {
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()){
            return user.get();
        }
        throw new UserException("User not exist with UserId"+ userId);
    }

    @Override
    public List<User> getAllUserDetails() throws UserException {

        List<User> existingAllUser = userRepository.findAll();
        if (existingAllUser.isEmpty()) {
            new UserException("User list is Empty");
        }
        return existingAllUser;
    }

    @Override
    public User findUserById(Integer userId) {

        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()){
            return user.get();
        }
        throw new UserException("User Not Exist With User Id "+userId);
    }


}
