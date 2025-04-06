import React, { useState, useRef, useEffect } from 'react';
import './HomeSlider.css';
import api from '../Roter/api';

const HomeSlider = () => {
  const [movie, setMovie] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [slideClass, setSlideClass] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    api.get("/api/all/video")
      .then((response) => {
        console.log("Fetched videos:", response.data);
        
        const filteredVideos = response.data.filter(video => [4, 7, 11,2,13].includes(video.id));
        setMovie(filteredVideos);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (movie.length === 0) return;

    const interval = setInterval(() => {
      setSlideClass("slide-out");
      setTimeout(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % movie.length);
        setSlideClass("slide-in");
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, [movie]);

  const handleThumbnailClick = (index) => {
    setSlideClass("slide-out");
    setTimeout(() => {
      setCurrentVideoIndex(index);
      setSlideClass("slide-in");
    }, 500);
  };

  return (
    <div className="home-slider">
      {movie.length > 0 ? (
        <>
          <div className={`video-section ${slideClass}`}>
            <video
              ref={videoRef}
              src={`${movie[currentVideoIndex].content}?autoplay=1&mute=1&controls=1`}
              title={movie[currentVideoIndex].title}
              width="100%"
              height="100%"
              controls
              autoPlay
              muted
            ></video>
            <div className="video-info">
              <h2>{movie[currentVideoIndex].title}</h2>
            </div>
          </div>

          <div className="thumbnail-strip">
            {movie.map((video, index) => (
              <img
                key={video.id}
                src={video.thumbNail}
                alt={video.title}
                className={`thumbnail ${index === currentVideoIndex ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </>
      ) : (
        <p>Loading videos...</p>
      )}
    </div>
  );
};

export default HomeSlider;
