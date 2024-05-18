import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, login } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [errorMessage, setErrorMessage] = useState("");

  // redirecting to the home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { email, password } = data;
    // console.log(email, password);
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;

        Swal.fire({
          icon: "success",
          title: "Signin Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("my_modal").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  // google signin
  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        document.getElementById("my_modal").close();
        navigate(from, { replace: true });

        Swal.fire({
          icon: "success",
          title: "Signin Successful!",
          showConfirmButton: false,
          timer: 1500,
        });

        axiosPublic.post("/users", userInfo);
      })
      .catch((error) => console.log(error));
  };

  return (
    <dialog id="my_modal" className="modal modal-middle">
      <div className="modal-box">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <button
            htmlFor="my_modal"
            onClick={() => document.getElementById("my_modal").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Please Login!</h3>

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

            {/* forgot password */}
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* error message */}
          {errorMessage ? (
            <p className="text-red text-sm italic">{errorMessage}</p>
          ) : (
            ""
          )}

          {/* submit button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Login"
              className="btn bg-green text-white"
            />
          </div>

          {/* signup */}
          <p className="text-center my-2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className=" underline-offset-[2px] underline text-red ml-1"
            >
              Signup Now
            </Link>
          </p>
        </form>

        {/* social signin */}
        <div className="text-center space-x-3 mb-5">
          <button
            className="btn btn-circle hover:bg-green hover:text-white"
            onClick={handleLogin}
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
    </dialog>
  );
};

export default Modal;
