package com.akhlaque.Ott.Platform.Service;
import com.akhlaque.Ott.Platform.Auth.Entity.User;
import com.akhlaque.Ott.Platform.Auth.Repository.UserRepository;
import com.akhlaque.Ott.Platform.Auth.Service.UserService;
import com.akhlaque.Ott.Platform.Repository.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.akhlaque.Ott.Platform.Entity.PostVideo;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    public PostRepo postRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;


    @Override
    public PostVideo createVideo(PostVideo postVideo) {

        PostVideo videos = new PostVideo();

        videos.setContent(postVideo.getContent());
        videos.setTitle(postVideo.getTitle());
        videos.setCategory(postVideo.getCategory());
        videos.setCreatedAt(LocalDateTime.now());
        videos.setThumbNail(postVideo.getThumbNail());
        videos.setYear(postVideo.getYear());

        return postRepo.save(videos);
    }

    @Override
    public List<PostVideo> allVideo() {

        return postRepo.findAll();
    }

    @Override
    public List<PostVideo> searchVideo(String query) {
        return postRepo.searchVideo(query);
    }

    @Override
    public User history(Integer id, Integer userId) throws Exception {

        User user = userService.findUserById(userId);

        if (user.getHistory()==null){
            user.setHistory(new ArrayList<>());
        }

        if (user.getHistory().contains(id)){
            user.getHistory().remove(id);
            user.getHistory().add(id);
        }

        else {
            user.getHistory().add(id);
        }

        return userRepository.save(user);
    }

    @Override
    public User removeHistory(Integer id, Integer userId) {

        User user = userService.findUserById(userId);
        user.getHistory().remove(id);

        return userRepository.save(user);
    }

    @Override
    public PostVideo deletePost(Integer id) {
        Optional<PostVideo> optionalPost = postRepo.findById(id);

        List<User> allUser = userService.getAllUserDetails();
        for (User u : allUser){
            if (u.getHistory() != null && u.getHistory().contains(id)){
                u.getHistory().remove(id);
                userRepository.save(u);
            }

        }

        if (optionalPost.isPresent()) {
            PostVideo post = optionalPost.get();
            postRepo.delete(post);
            return post;
        } else {
            throw new RuntimeException("Post not found with id: " + id);
        }
    }



}
