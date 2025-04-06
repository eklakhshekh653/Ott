package com.akhlaque.Ott.Platform.Controller;

import com.akhlaque.Ott.Platform.Auth.Entity.User;
import com.akhlaque.Ott.Platform.Entity.PostVideo;
import com.akhlaque.Ott.Platform.Service.PostService;
import com.akhlaque.Ott.Platform.Service.PostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostService postService;


    @PostMapping("/create")
    public PostVideo createPostVideo(@RequestBody PostVideo postVideo){
        return postService.createVideo(postVideo);
    }

    @GetMapping("/all/video")
    public List<PostVideo>  allPostVideo(){
        List<PostVideo> allVideo = postService.allVideo();
        return allVideo;
    }

    @GetMapping("/search/video")
    public List<PostVideo> searchVideo(@RequestParam("query") String query){
        return postService.searchVideo(query);
    }

    @PutMapping("/history/post/{id}/user/{userId}")
    public User historyVideo(@PathVariable Integer id, @PathVariable Integer userId) throws Exception {
        return postService.history(id,userId);
    }
    @PutMapping("/history/remove/post/{id}/user/{userId}")
    public User removeHistoryVideo(@PathVariable Integer id, @PathVariable Integer userId) throws Exception {
        return postService.removeHistory(id,userId);
    }

    @DeleteMapping("/delete/post/{id}")
    public PostVideo deletePost(@PathVariable Integer id){
        return postService.deletePost(id);
    }

}
