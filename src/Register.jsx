import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FaGoogle } from "react-icons/fa";
import GoogleLogin from "./GoogleLogin";

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
        <div class="bg-black/50  flex flex-col rounded-xl shadow-lg p-8 md:p-10 space-y-4 backdrop-blur-sm my-64">
          <div class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
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
              <div className="flex gap-x-5 text-lg font-bold pt-5">
                <button
                  type="submit"
                  className="w-32 border-2 border-gray-300 rounded-lg p-2  bg-black text-white hover:bg-white hover:text-black font-xl"
                >
                  Register
                </button>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  className=" flex items-center text-center w-60 border-2 border-gray-300 rounded-lg p-2 bg-black text-white hover:bg-white hover:text-black font-xl"
                >
                  <div className="mr-3 ml-2">
                    <FaGoogle />
                  </div>
                  <GoogleLogin buttonText="Register with Google" />
                </div>
              </div>
              <span class="block  text-white sm:text-center mt-5 ">
                Already have an account?{" "}
                <a href="/login" class="hover:underline">
                  Login
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
