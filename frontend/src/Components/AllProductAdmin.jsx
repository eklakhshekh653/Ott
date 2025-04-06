import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllProductAdmin.css";
import api from "../Roter/api";

const AllProductAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVideos = async () => {
      try {
        const response = await api.get("/api/all/video");
        console.log("Fetched videos:", response.data);
        if (isMounted) {
          setVideos(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchVideos();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, []);

  const deleteVideo = async (videoId) => {
    try {
      console.log("Deleting video with ID:", videoId);
      const response = await api.delete(`/api/delete/post/${videoId}`);

      if (response.status === 200 || response.status === 204) {
        console.log("Video deleted successfully.");
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
      } else {
        throw new Error("Failed to delete video");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Error deleting video: " + error.message);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center", color: "blue" }}>Loading...</h2>;
  }

  if (error) {
    return <h2 style={{ textAlign: "center", color: "red" }}>Error: {error.message}</h2>;
  }

  return (
    <>
      <h1 style={{ color: "green", textAlign: "center", margin: "5px" }}>All Videos</h1>
      <div className="product-container1">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div className="product-card1" key={video.id}>
              <div className="product-image11">
                <img src={video.thumbNail} alt={video.title} />
              </div>

              <div className="product-info1">
                <h2>{video.title}</h2>
                <p>Video ID: {video.id}</p>
                <p>Category: {video.category}</p>
                <p>Year: {video.year}</p>

                <div className="video-container">
                  <video width="100%" controls>
                    <source src={video.content} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="button-container1">
                  <button className="delete" onClick={() => deleteVideo(video.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 style={{ textAlign: "center", color: "gray" }}>No videos available</h2>
        )}
      </div>
    </>
  );
};

export default AllProductAdmin;
