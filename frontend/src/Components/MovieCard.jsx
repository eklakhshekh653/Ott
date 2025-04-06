import React, { useState } from "react";
import axios from "axios"; // Axios import karein
import api from "../Roter/api";
import { useNavigate } from "react-router-dom";
import "./Movie.css";

const MovieCard = ({ movie, onWatchNow }) => {
    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate();

    const handleWatchNow = async () => {
        const userId = localStorage.getItem("userid");
        if (!userId) {
            alert("User not logged in!");
            navigate("/login")
            return;
        }

        try {
            const response = await api.put(`http://localhost:8080/api/history/post/${movie.id}/user/${userId}`);
            
            if (response.status === 200) {
                console.log("Movie added to history successfully");
                onWatchNow(movie); // Agar API successful ho to callback execute karein
            } else {
                console.error("Failed to update history");
            }
        } catch (error) {
            console.error("Error while updating history:", error);
        }
    };

    return (
        <div className="movie">
            <div>
                <p>{movie.year}</p>
            </div>
            <div
                className="post"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={movie.thumbNail} alt={movie.title} />
                {isHovered && (
                    <div className="overlay">
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

export default MovieCard;
