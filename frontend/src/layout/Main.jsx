import React, { useContext } from "react";
import Header from "./../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import "../App.css";
import { AuthContext } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const Main = () => {
  const { loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Header />
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Main;
