package com.akhlaque.Ott.Platform.Auth.Repository;

import com.akhlaque.Ott.Platform.Auth.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
