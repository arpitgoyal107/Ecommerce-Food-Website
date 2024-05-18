import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, signUpWithGmail, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [errorMessage, setErrorMessage] = useState("");

  // redirecting to the home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { name, email, password } = data;
    // console.log(email, password);
    createUser(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;

        // update user profile
        updateUserProfile(
          data.name,
          "https://cdn.pixabay.com/photo/2024/03/28/18/06/dog-8661433_1280.png"
        ).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            Swal.fire({
              icon: "success",
              title: "Signin Successful!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + ": " + errorMessage);
      });
  };

  //   first go to home("/") and then open "my_modal" for login form
  const handleLoginClick = () => {
    setTimeout(() => {
      document.getElementById("my_modal").showModal();
    }, 500); // Adjust the delay time as needed
  };

  // google signin
  const handleGoogleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };

        axiosPublic.post("/users", userInfo);

        Swal.fire({
          icon: "success",
          title: "Signin Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-md shadow-lg rounded-md py-6 px-3 mx-auto my-24 items-center justify-center relative">
      <Link
        to="/"
        className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
      >
        ✕
      </Link>
      <form
        className="card-body"
        method="dialog"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="font-bold text-lg">Create A User Account!</h3>

        {/* name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="name"
            className="input input-bordered"
            {...register("name")}
          />
        </div>

        {/* email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            {...register("email")}
          />
        </div>

        {/* password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            {...register("password")}
          />
        </div>

        {/* error message */}
        {errorMessage ? <p className="text-red text-sm">{errorMessage}</p> : ""}

        {/* Signup button */}
        <div className="form-control mt-6">
          <input
            type="submit"
            value="Signup"
            className="btn bg-green text-white"
          />
        </div>

        {/* Login */}
        <p className="text-center my-2">
          Have an account?{" "}
          <Link
            to="/"
            onClick={handleLoginClick}
            className=" underline-offset-[2px] underline text-red ml-1"
          >
            Login
          </Link>
        </p>
      </form>

      {/* social signin */}
      <div className="text-center space-x-3 mb-5">
        <button
          className="btn btn-circle hover:bg-green hover:text-white"
          onClick={handleGoogleLogin}
        >
          <FaGoogle size={16} />
        </button>

        <button className="btn btn-circle hover:bg-green hover:text-white">
          <FaFacebookF size={16} />
        </button>

        <button className="btn btn-circle hover:bg-green hover:text-white">
          <FaGithub size={16} />
        </button>
      </div>
    </div>
  );
};

export default Signup;
