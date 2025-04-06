package com.akhlaque.Ott.Platform.Repository;

import com.akhlaque.Ott.Platform.Auth.Entity.User;
import com.akhlaque.Ott.Platform.Entity.PostVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepo extends JpaRepository<PostVideo, Integer> {

    @Query("SELECT p FROM PostVideo p WHERE p.title LIKE %:query% OR p.year LIKE %:query%")
    public List<PostVideo> searchVideo(@Param("query") String query);

}
