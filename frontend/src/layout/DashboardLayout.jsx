import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdOutlineDashboardCustomize } from "react-icons/md";
import {
  FaCartPlus,
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";
import logo from "/logo.png";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Signup from "../components/Signup";
import LoadingSpinner from "./../components/LoadingSpinner";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard /> Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaCartPlus /> Menu
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaLocationArrow /> Orders Tracking
      </Link>
    </li>
    <li>
      <Link to="/dashboard">
        <FaQuestionCircle /> Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  return (
    <div>
      {isAdmin ? (
        <div className="drawer sm:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start">
            {/* Page content here */}
            <div className="flex self-center justify-between w-full p-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button sm:hidden"
              >
                <MdOutlineDashboardCustomize />
              </label>

              <button className="btn bg-green text-white rounded-full px-6 sm:hidden flex items-center gap-2 ">
                <FaRegUser /> Logout
              </button>
            </div>
            <div className="my-5 sm:my-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link
                  to="/dashboard"
                  className="flex justify-start flex-row mb-3"
                >
                  <img src={logo} alt="logo" className="w-20" />
                  <span className="badge badge-primary">admin</span>
                </Link>
              </li>
              <hr />
              <li className="mt-3">
                <Link to="/dashboard">
                  <MdDashboard /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <FaShoppingBag /> Manage Bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <FaPlusCircle /> Add Menu
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <FaEdit /> Manage Items
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/dashboard/users">
                  <FaUsers /> Users
                </Link>
              </li>

              <hr />

              {
                // sharedLinks
                sharedLinks
              }
            </ul>
          </div>
        </div>
      ) : loading || isAdminLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="h-screen flex justify-center items-center">
          <Link to="/">
            <button className="btn bg-green text-white">Back to Home</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
