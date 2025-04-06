import React, { useState, useEffect } from "react";
import { Search, Film, MonitorPlay, Ellipsis, Tally3, LogIn, LogOut, User, History } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./HomePage.css";
import api from "../Roter/api";
import MovieCard from "../Components/MovieCard";



const HomePage = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    api.get("/api/all/video")
      .then((response) => {
        setOriginalMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching all videos:", error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults(originalMovies);
    } else {
      api.get(`/api/search/video?query=${searchTerm}`)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching search data:", error);
        });
    }
  }, [searchTerm, originalMovies]);

  const handleWatchNow = (movie) => {
    setSelectedMovie(movie);
    setFullscreen(true);
  };

  const closeFullscreen = () => {
    setFullscreen(false);
    setSelectedMovie(null);
  };

  const navigate = useNavigate();
  let userId = localStorage.getItem("userid");
  let name = localStorage.getItem("name");

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("name");
    alert("Logout Successfully.....");
    navigate("/");
  };

  return (
    <div className="hotstar-container">
      <div className="sidebar">
        <Link to="/" className="sidebar-item">
          <Film size={24} className="icon" />
          <span className="sidebar-text">Movies</span>
        </Link>

        <div className="sidebar-item" onClick={() => setShowSearch(!showSearch)}>
          <Search size={24} className="icon" />
          <span className="sidebar-text">Search</span>
        </div>

        <Link to="/tv" className="sidebar-item">
          <MonitorPlay size={24} className="icon" />
          <span className="sidebar-text">TV</span>
        </Link>

        <Link to="/sport" className="sidebar-item">
          <Tally3 size={24} className="icon" />
          <span className="sidebar-text">Sports</span>
        </Link>

        <Link to="/more" className="sidebar-item">
          <Ellipsis size={24} className="icon" />
          <span className="sidebar-text">More</span>
        </Link>
        <Link to="/history" className="sidebar-item">
          <History size={24} className="icon" />
          <span className="sidebar-text">History</span>
        </Link>

        <div className="sidebar-bottom">
          {userId ? (
            <>
              <div className="sidebar-item">
                <User size={24} className="icon" />
                <span className="sidebar-text">{name}</span>
              </div>
              <div className="sidebar-item" onClick={handleLogoutClick}>
                <LogOut size={24} className="icon" />
                <span className="sidebar-text">Logout</span>
              </div>
            </>
          ) : (
            <>
              <div className="sidebar-item" onClick={handleLoginClick}>
                <LogIn size={24} className="icon" />
                <span className="sidebar-text">Login</span>
              </div>
              <div className="sidebar-item" onClick={() => navigate("/register")}>
                <User size={24} className="icon" />
                <span className="sidebar-text">Sign In</span>
              </div>
            </>
          )}

        </div>
      </div>
      <div className="main-content">
        {showSearch && (
          <input
            type="text"
            placeholder="Search movies, shows..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        {searchTerm.trim() !== "" ? (
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((video) => (
                <div key={video.id} className="search-item">
                  <MovieCard movie={video} onWatchNow={handleWatchNow} />
                </div>
              ))
            ) : (
              <h2>No results found</h2>
            )}
          </div>
        ) : (
          <Outlet />
        )}
      </div>

      {fullscreen && selectedMovie && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <video 
            src={selectedMovie.content} 
            controls 
            autoPlay
            className="fullscreen-video"
          />
          <button onClick={closeFullscreen} className="close-button">Close</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;