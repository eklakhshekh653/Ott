import React, { useState } from "react";
import api from "../Roter/api";
import { useNavigate } from "react-router-dom";
import "./Movie.css";

const HistoryCard = ({ movie, onWatchNow, onRemoveHistory }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleWatchNow = async () => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      alert("User not logged in!");
      navigate("/login");
      return;
    }

    try {
      const response = await api.put(
        `http://localhost:8080/api/history/post/${movie.id}/user/${userId}`
      );

      if (response.status === 200) {
        console.log("Movie added to history successfully");
        onWatchNow(movie);
      } else {
        console.error("Failed to update history");
      }
    } catch (error) {
      console.error("Error while updating history:", error);
    }
  };

  const removeHistory = async () => {
    const userId = localStorage.getItem("userid");
    if (!userId || !movie.id) {
      console.error("User ID or Movie ID is missing");
      return;
    }

    try {
      const response = await api.put(
        `http://localhost:8080/api/history/remove/post/${movie.id}/user/${userId}`
      );

      if (response.status === 200) {
        console.log("Movie removed from history successfully");
        onRemoveHistory(movie.id);
      } else {
        console.error("Failed to remove history");
      }
    } catch (error) {
      console.error("Error while removing history:", error);
    }
  };

  return (
    <div className="history">
      <div className="header">
        <p>{movie.year}</p>
        <button onClick={removeHistory} className="remove-history">
          ✖
        </button>
      </div>
      <div
        className="post"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.thumbNail} alt={movie.title} />
        {isHovered && (
          <div className="overlay-h">
            <button onClick={handleWatchNow}>
              <b>Watch Now</b>
            </button>
          </div>
        )}
      </div>

      <div>
        <span>{movie.category}</span>
        <h3>{movie.title}</h3>
      </div>
    </div>
  );
};

export default HistoryCard;
