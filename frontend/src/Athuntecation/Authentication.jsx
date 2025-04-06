import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";



const Authentication = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:block w-7/12 h-full">
        <img
          className="w-full h-full object-cover"
          src="https://img.freepik.com/free-vector/influencer-recording-new-video_23-2148527130.jpg?t=st=1740903471~exp=1740907071~hmac=254110f37f6c031519ab8dacefff5796f892321665efc163fdc087469f8f074b&w=1380"
          alt="Social Media Icons"
        />
      </div>


      <div className="w-full md:w-5/12 flex items-center justify-center mt-5 px-3">
        <div className="bg-white p-3 shadow-lg rounded-lg w-full max-w-md">

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
