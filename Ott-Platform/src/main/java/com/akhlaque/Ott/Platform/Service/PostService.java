package com.akhlaque.Ott.Platform.Service;

import com.akhlaque.Ott.Platform.Auth.Entity.User;
import com.akhlaque.Ott.Platform.Entity.PostVideo;

import java.util.List;

public interface PostService {

    public PostVideo createVideo(PostVideo postVideo);

    public List<PostVideo> allVideo();

    public List<PostVideo> searchVideo(String query);

    public User history(Integer id, Integer userId) throws Exception;

    public User removeHistory(Integer id, Integer userId);

    PostVideo deletePost(Integer id);

}
