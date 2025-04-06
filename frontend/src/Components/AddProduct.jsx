import React, { useState } from "react";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";
import { uploadCloudinary } from "../UploadToCloudinary";
import api from "../Roter/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Video } from "lucide-react";

function AddProduct() {
  const navigate = useNavigate();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [postVideo, setPostVideo] = useState({
    content: "",
    title: "",
    thumbNail: "",
    category: "",
    year: "",
  });

  const handleSelectImage = async (event) => {
    try {
      setIsLoadingImage(true);
      const thumbNail = await uploadCloudinary(event.target.files[0], "image");
      setSelectedImage(thumbNail);
      setPostVideo((prev) => ({ ...prev, thumbNail }));
    } catch (error) {
      console.error("Thumbnail upload failed", error);
      alert("Failed to upload thumbnail. Please try again.");
    } finally {
      setIsLoadingImage(false);
    }
  };

  const handleSelectVideo = async (event) => {
    try {
      setIsLoadingVideo(true);
      const content = await uploadCloudinary(event.target.files[0], "video");
      setSelectedVideo(content);
      setPostVideo((prev) => ({ ...prev, content}));
    } catch (error) {
      console.error("Video upload failed", error);
      alert("Failed to upload video. Please try again.");
    } finally {
      setIsLoadingVideo(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostVideo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/create", postVideo);
      console.log("Product added successfully:", response.data);
      setPostVideo({
        content: "",
        title: "",
        thumbNail: "",
        category: "",
        year: "",
      });
      setSelectedVideo(null);
      setSelectedImage(null);
      alert("Product Added Successfully......");
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Error adding video.");
      console.error("Error adding video:", error.response?.data);
    }
  };

  return (
    <div className="adminAddProduct">
      <h2 style={{ textAlign: "center" }}>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="file"
            accept="video/*"
            onChange={handleSelectVideo}
            id="video-input"
          />
          <label htmlFor="video-input" > Upload Video</label>
          {isLoadingVideo && <AiOutlineLoading3Quarters className="spinner" />}
        </div>
        {selectedVideo && <video src={selectedVideo} controls width="350" />}

        <div className="input-group">
          <input
            type="file"
            accept="image/*"
            onChange={handleSelectImage}
            id="image-input"
          />
          <label htmlFor="image-input">Upload Thumbnail</label>
          {isLoadingImage && <AiOutlineLoading3Quarters className="spinner" />}
        </div>
        {selectedImage && <img src={selectedImage} alt="Thumbnail" width="200" />}

        <div className="input-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={postVideo.title}
            onChange={handleChange}
            placeholder="Title"
          />
        </div>

        <div className="input-group">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={postVideo.year}
            onChange={handleChange}
            placeholder="Year"
          />
        </div>

        <div className="input-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={postVideo.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="movie">Movie</option>
            <option value="sports">Sports</option>
            <option value="tv">TV & Shows</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" disabled={isLoadingVideo || isLoadingImage}>
          {(isLoadingVideo || isLoadingImage) ? <AiOutlineLoading3Quarters className="spinner" /> : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
