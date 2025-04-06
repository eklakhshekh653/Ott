import React, { useState } from "react";
import "./Admin.css";
import AddCustomerAdmin from "../components/AdminUserDetails";


import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import AllProductAdmin from "./AllProductAdmin";


const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const navigate = useNavigate();

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "add-product":
        return <AddProduct />;
      case "all-orders":
        return <AddOrderAdmin />;
      case "add-customer":
        return <AddCustomerAdmin />;
      default:
        return <AllProductAdmin />;
    }
  };

  return (
    <>
      <div className="admin-navbar">
        <h3
          onClick={() => {
            setSelectedComponent(<AllProductAdmin />);
          }}
        >
          Admin Home
        </h3>
        <h3
          onClick={() => {
            localStorage.removeItem("adminid");
            localStorage.removeItem("jwtTocken");
            navigate("/admin-login");
          }}
        >
          Logout
        </h3>
      </div>

      <div className="admincontainer">
        
        <div className="boxConatiner">
          <ul>
            <li
              onClick={() => {
                setSelectedComponent("add-product");
              }}
            >
              Add New Video
            </li>
            <li
              onClick={() => {
                setSelectedComponent("add-customer");
              }}
            >
              View All Customer
            </li>
          </ul>
        </div>
        <div className="productConatiner">{renderSelectedComponent()}</div>
      </div>
    </>
  );
};
export default Admin;
