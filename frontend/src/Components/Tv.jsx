import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import HomeSlider from "./MovieSlider";
import MovieCard from "./MovieCard";
import "./Movie.css";
import api from "../Roter/api";

const Tv = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    api
      .get("/api/all/video")
      .then((response) => {
        console.log("Fetched videos:", response.data);
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);

  const handleWatchNow = (movie) => {
    setSelectedMovie(movie);
    setFullscreen(true);
  };

  const closeFullscreen = () => {
    setFullscreen(false);
    setSelectedMovie(null);
  };

  const filteredMovies = movies.filter((movie) => movie.category === "tv");

  return (
    <>
      <div className={`app ${fullscreen ? "fullscreen" : ""}`}>
        {!fullscreen && (
          <>
          <h2 className="title">TV & Shows</h2>
            <HomeSlider />

            {filteredMovies.length > 0 ? (
              <div className="container">
                {filteredMovies.map((movie) => (
                  <MovieCard
                    movie={movie}
                    key={movie.year}
                    onWatchNow={handleWatchNow}
                  />
                ))}
              </div>
            ) : (
              <div className="empty">
                <h2>No movies found</h2>
              </div>
            )}
          </>
        )}

        {fullscreen && selectedMovie && (
          <div className="video-fullscreen">
            <video
              src={selectedMovie.content}
              controls
              autoPlay
              className="fullscreen-video"
            />
            <button onClick={closeFullscreen} className="close-button">
              ✖
            </button>
          </div>
        )}
      </div>
      {!fullscreen && <Footer />}
    </>
  );
};

export default Tv;
