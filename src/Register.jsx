import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";

import GoogleLogin from "./GoogleLogin";
import Facebook from "./FacebookLogin";
import { FaFacebookF } from "react-icons/fa6";

export default function Register() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const [items, setItems] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function register() {
    try {
      const responseRegister = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        {
          email: email,
          name: name,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("jsonRegister", responseRegister.data);

      if (responseRegister.status === 201) {
        setMessage("Register successful");
      } else {
        setMessage(
          "Register failed. Please check your credentials. " +
            responseRegister.data.message
        );
      }
    } catch (error) {
      setMessage("Register failed because " + error.response.data.message);
      console.error("An error occurred:", error);
    }
  }
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register();
  };

  useEffect(() => {
    const items = localStorage.getItem("token");
    if (items) {
      setItems(items);
    }
  }, []);

  console.log("items", items);

  return (
    <div className="flex flex-col items-center text-center justify-center bg-image h-full min-h-screen">
      <div className="  w-full h-full flex flex-col items-center text-center justify-center">
        <Navbar />
        <div class="bg-black/50  flex flex-col rounded-xl shadow-lg p-8 md:p-10 space-y-4 backdrop-blur-lg my-64">
          <div class="text-5xl font-bold tracking-tight leading-tight text-white">
            Register
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
                    value={email}
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
                    value={password}
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
                <div className="flex items-center bg-white rounded-lg">
                  <CgProfile size={30} color={"gray"} className="ml-3" />
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={handleName}
                    className=" bg-transparent border-none outline-none  p-2 m-2 flex-grow "
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 mt-5 items-center">
                <button
                  type="submit"
                  className="flex border-2 font-semibold items-center justify-center w-96 h-10 border-gray-300 rounded-lg p-2 bg-white text-black hover:bg-gray-300 hover:text-black font-xl"
                >
                  Register
                </button>
              </div>

              <div className="flex flex-col gap-5 mt-5 items-center">
                <div className="flex font-semibold items-center text-center relative">
                  <div className="border border-white flex-grow mr-2 w-40"></div>
                  <div className="text-white font-semibold">Or</div>
                  <div className="border border-white flex-grow ml-2 w-40"></div>
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className=" flex border-2 font-semibold items-center justify-center text-center w-96  border-gray-300 rounded-lg p-2 bg-white text-black hover:bg-gray-300 hover:text-black font-xl"
                >
                  <div className="mr-3 ml-2">
                    <FcGoogle size={20} />
                  </div>
                  <GoogleLogin buttonText="Register with Google" />
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className=" flex font-semibold items-center justify-center text-center w-96  border-gray-300 rounded-lg p-2 bg-[#4267b2] text-white hover:bg-blue-700 hover:text-white font-xl"
                >
                  <div className="mr-2 ml-2">
                    <FaFacebookF size={20} />
                  </div>
                  <Facebook buttonText="Register with Facebook" />
                </div>
              </div>
              <span class="block  text-white sm:text-center mt-5 font-semibold ">
                Already have an account?{" "}
                <a
                  href="/login"
                  class="hover:underline  text-blue-400 hover:text-blue-500"
                >
                  Login Here.
                </a>
                {"   "}
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
