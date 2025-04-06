import { useEffect, useState } from "react";
import Footer from "./Footer";
import HomeSlider from "./MovieSlider";
import MovieCard from "./MovieCard";
import "./Movie.css";
import api from "../Roter/api";

const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {
        api.get("/api/all/video")
            .then((response) => {
                console.log("Fetched videos:", response.data);
                setMovies(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
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

    const filteredMovies = movies.filter((movie) => movie.category === "movie");

    return (
        <>
            <div className={`app ${fullscreen ? "fullscreen-mode" : ""}`}>
                {!fullscreen && (
                    <>
                    <h2 className="title">Movies</h2>
                        <HomeSlider />
                        {filteredMovies.length > 0 ? (
                            <div className="container">
                                {filteredMovies.map((movie, index) => (
                                    <MovieCard
                                        movie={movie}
                                        key={index} 
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
                        <button 
                            onClick={closeFullscreen} 
                            className="close-button"
                        >
                            ✖
                        </button>
                    </div>
                )}
            </div>
            {!fullscreen && <Footer />}
        </>
    );
};

export default Movie;
