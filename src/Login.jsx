import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";

import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin as Google } from "@react-oauth/google";

export default function Login() {
  const navigate = useNavigate();

  const [emailData, setemailData] = useState("");
  const [passwordData, setpasswordData] = useState("");
  const [data, setData] = useState([]);
  const [items, setItems] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function login() {
    try {
      const responseLogin = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
        {
          email: emailData,
          password: passwordData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setData(responseLogin?.data?.data);
      if (responseLogin?.status === 200) {
        localStorage.setItem("login", "login");
        localStorage.setItem("token", responseLogin?.data?.data?.token);
        navigate("/", {
          state: { token: responseLogin?.data?.data?.token },
        });
      } else {
        alert("password atau username salah");
      }
      setMessage("Login successful"); // Set welcome message
    } catch (error) {
      setMessage("Login failed because " + error.response.data.message);
      console.error("An error occurred:", error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      alert("Tidak perlu login lagi, karena token kamu masih aktif kok");
      navigate("/");
    }
  }, []);

  console.log("data", data);
  console.log("localStorage ", localStorage.getItem("token"));

  const handleEmail = (event) => {
    setemailData(event.target.value);
  };

  const handlePassword = (event) => {
    setpasswordData(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setpasswordData("");
    setemailData("");
    setData([]);
    setItems("");
  };

  return (
    <div className="flex flex-col items-center text-center justify-center bg-image h-full min-h-screen">
      <div className="  w-full h-full flex flex-col items-center text-center justify-center">
        <Navbar />
        <div class="bg-black/50  flex flex-col rounded-xl shadow-lg p-8 md:p-10 space-y-4 backdrop-blur-sm my-64">
          <div class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
            Login
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-wrap justify-center items-center "
            >
              <div className="flex flex-col mt-5 w-96 gap-y-5">
                <div className="flex items-center bg-white rounded-lg">
                  <MdOutlineEmail size={30} color={"gray"} className="ml-3" />
                  <input
                    type="text"
                    placeholder="Email"
                    value={emailData}
                    onChange={handleEmail}
                    className=" bg-transparent border-none outline-none  p-2 m-2 flex-grow "
                  />
                </div>
                <div className="flex items-center bg-white rounded-lg text-center">
                  <RiLockPasswordLine
                    size={30}
                    color={"gray"}
                    className="ml-3"
                  />
                  <input
                    type={showPassword ? "text" : "password"} // Ternary operator to toggle between "text" and "password"
                    placeholder="Password"
                    value={passwordData}
                    onChange={handlePassword}
                    className="bg-transparent border-none outline-none p-2 m-2 flex-grow"
                  />
                  <button
                    className="mr-3"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <PiEyeLight size={22} color={"gray"} />
                    ) : (
                      <PiEyeSlashLight size={22} color={"gray"} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex gap-x-5 text-lg font-bold pt-5">
                <button
                  type="submit"
                  className="w-32 border-2 border-gray-300 rounded-lg p-2 bg-black text-white hover:bg-white hover:text-black font-xl"
                >
                  Login
                </button>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  className=" flex items-center text-center w-56 border-2 border-gray-300 rounded-lg p-2 bg-black text-white hover:bg-white hover:text-black font-xl"
                >
                  <div className="mr-3 ml-2">
                    <FaGoogle />
                  </div>
                  <GoogleLogin buttonText="Login with Google" />
                </div>
              </div>
              <div className="pt-5">
                <Google
                  onSuccess={(credentialResponse) => {
                    localStorage.setItem(
                      "token",
                      credentialResponse.credential
                    );
                    localStorage.setItem("login", "google component");
                    navigate("/", {
                      state: { token: credentialResponse.credential },
                    });
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              <span class="block  text-white sm:text-center mt-5 ">
                Dont have an account?{" "}
                <a href="/register" class="hover:underline">
                  Register
                </a>
                {"   "}
                Here.
              </span>
            </form>
          </div>
          <div className="flex flex-col items-center">
            {message && (
              <p
                className={`text-lg ${
                  message.includes("successful")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
