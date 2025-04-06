import { useEffect, useState } from "react";
import Footer from "./Footer";
import "./Movie.css";
import api from "../Roter/api";
import HistoryCard from "./HistoryCard";

const History = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState({ history: [] }); // ✅ Default to an object with an empty history array
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  const userId = localStorage.getItem("userid");

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

  useEffect(() => {
    if (userId) {
      api
        .get(`/ott/customers/api/${userId}`)
        .then((response) => {
          setUser(response.data || { history: [] }); // ✅ Ensure history is always an array
        })
        .catch((error) => {
          console.error("Error fetching history data: ", error);
        });
    }
  }, [userId]);

  const history = (user.history || [])
    .slice()
    .reverse()
    .map((id) => movies.find((item) => item.id === id))
    .filter((movie) => movie !== undefined);

  const handleWatchNow = (movie) => {
    setSelectedMovie(movie);
    setFullscreen(true);
  };

  const closeFullscreen = () => {
    setFullscreen(false);
    setSelectedMovie(null);
  };

  const handleRemoveHistory = (movieId) => {
    setUser((prevUser) => ({
      ...prevUser,
      history: prevUser.history.filter((id) => id !== movieId),
    }));
  };

  return (
    <>
      <div className={`app ${fullscreen ? "fullscreen-mode" : ""}`}>
        {!fullscreen && (
          <>
            <h2 className="title">Watch History</h2>
            {history.length > 0 ? (
              <div className="container">
                {history.map((movie, index) => (
                  <HistoryCard
                    key={index}
                    movie={movie}
                    onWatchNow={handleWatchNow}
                    onRemoveHistory={handleRemoveHistory}
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
      {!<Footer />}
    </>
  );
};

export default History;
