import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Login from "../Athuntecation/Login";
import Register from "../Athuntecation/Register";
import AdminLogin from "../Components/AdminLogin";
import Admin from "../Components/Admin";
import { Privaterouteadmin } from "./ProtectedRoute";
import Movie from "../Components/movie";
import Sport from "../Components/Sport";
import Tv from "../Components/Tv";
import Other from "../Components/Other";
import History from "../Components/History";

const AllRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>

        <Route path="/" element={<Movie />} />
        <Route path="sport" element={<Sport />} />
        <Route path="tv" element={<Tv />} />
        <Route path="more" element={<Other />} />
        <Route path="history" element={<History />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-login" element={<AdminLogin />} />


      <Route element={<Privaterouteadmin />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default AllRouter;
