import { useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {
  GiBiceps,
  GiWindyStripes,
  GiSwordman,
  GiBowman,
  GiSpinningSword,
  GiSpeedometer,
} from "react-icons/gi";
import { FaGlobe, FaRecycle, FaRunning, FaEye, FaBrain } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { TbRulerMeasure } from "react-icons/tb";
import { PiClockClockwiseBold } from "react-icons/pi";
import { FiSun } from "react-icons/fi";
import { IoMoonSharp, IoSunny } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { GiBrain } from "react-icons/gi";

const HeroDetail = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [detail, setDetail] = useState([]);

  const detailHero = async (heroId) => {
    try {
      const response = await axios.get(
        `https://api.opendota.com/api/heroStats`,
        { headers: { accept: "application/json" } }
      );
      console.log("response data", response.data);

      // Filter the response data based on heroId
      const filteredDetail = response.data.find((hero) => hero.id === heroId);

      // Set the filtered detail
      setDetail(filteredDetail);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    console.log("location ", location);
    console.log("detail ", detail);

    detailHero(location.state.id);
  }, []);

  const getPrimaryAttributeFullName = (attr) => {
    switch (attr) {
      case "agi":
        return "Agility";
      case "str":
        return "Strength";
      case "int":
        return "Intelligence";
      default:
        return "Universal";
    }
  };

  const getPrimaryAttributeIcon = (primaryAttr) => {
    switch (primaryAttr) {
      case "str":
        return (
          <div
            style={{
              backgroundColor: "#ebe8e8",
              padding: "6px",
              borderRadius: "90%",
            }}
          >
            <GiBiceps size={23} color={"red"} />
          </div>
        );
      case "agi":
        return (
          <div
            style={{
              backgroundColor: `#ebe8e8`,
              padding: "6px",
              borderRadius: "90%",
            }}
          >
            <GiWindyStripes size={23} color={"lime"} />
          </div>
        );
      case "int":
        return (
          <div
            style={{
              backgroundColor: "#ebe8e8",
              padding: "6px",
              borderRadius: "90%",
            }}
          >
            <FaWandMagicSparkles size={23} color={"skyblue"} />
          </div>
        );
      default:
        return (
          <div
            style={{
              backgroundColor: "#ebe8e8",
              padding: "6px",
              borderRadius: "90%",
            }}
          >
            <FaRecycle size={23} color={"white"} />
          </div>
        ); // Return null or a default icon if primary attribute is unknown
    }
  };

  const getAttackTypeIcon = (attack_type) => {
    switch (attack_type) {
      case "Melee":
        return (
          <div>
            <GiSwordman size={25} color={"white"} />
          </div>
        );
      case "Ranged":
        return <GiBowman size={25} color={"white"} />;
      default:
        return null; // Return null or a default icon if primary attribute is unknown
    }
  };

  return (
    <div
      className="bg-cover bg-fixed bg-no-repeat bg-stone-500 bg-blend-multiply h-full min-h-screen "
      style={{
        backgroundImage: `url('https://i.imgur.com/0uueOOL.jpeg')`,
        height: "",
      }}
    >
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div class=" flex  rounded shadow-lg  md:p-10 space-y-4 backdrop-blur-sm bg-black/60 ">
          <div>
            <img
              src={`https://cdn.cloudflare.steamstatic.com${detail?.img}`}
              className="w-auto h-64 rounded-lg "
              alt={detail?.localized_name}
            />

            <div className="flex items-center space-x-4 pt-5">
              <img
                src={`https://cdn.cloudflare.steamstatic.com${detail?.icon}`}
                className="w-auto h-20 object-cover rounded-lg"
                alt={detail?.localized_name}
              />
              <h1 className="text-3xl font-semibold text-white">
                {detail?.localized_name}
              </h1>
            </div>
            <div className="flex gap-4">
              <button
                className="mt-7 px-4 py-2  font-sans bg-white border border-solid border-gray-400 text-black rounded-md shadow-md hover:bg-gray-400 hover:border-gray-500 focus:outline-none focus:ring focus:ring-gray-300 hover:scale-105"
                onClick={() => {
                  navigate("/heroes", { state: { id: detail?.id } });
                }}
              >
                <div className="w-5 h-5 ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      transform="rotate(180 256 256)"
                      d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                    />
                  </svg>
                </div>
                <span class="sr-only">Icon description</span>
              </button>
              <button
                className="mt-7 px-4 py-2 font-semibold bg-white border border-solid border-gray-400 text-black rounded-md shadow-md hover:bg-gray-400 hover:border-gray-500 focus:outline-none focus:ring focus:ring-gray-300 hover:scale-105"
                onClick={() => {
                  navigate("/hero-matchup", { state: { id: detail?.id } });
                }}
              >
                Show Matchups
                <span class="sr-only">Icon description</span>
              </button>
            </div>
          </div>
          <div className="pl-6 font-medium">
            <div className="flex  gap-2">
              {detail?.roles && (
                <div className="text-lg ">
                  <span className="text-white">Roles:</span>
                  <ul className="list-disc ml-6 text-white">
                    {detail.roles.map((role, index) => (
                      <li key={index}>{role}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <div className="text-lg  text-white flex items-center">
                Primary Attribute :{" "}
                {getPrimaryAttributeFullName(detail?.primary_attr)}
              </div>
              {getPrimaryAttributeIcon(detail?.primary_attr)}
            </div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  backgroundColor: "#ebe8e8",
                  padding: "6px",
                  borderRadius: "90%",
                }}
              >
                <GiBiceps size={20} color={"red"} />
              </div>{" "}
              <div className="text-lg text-white flex items-center">
                {detail?.base_str} + {detail?.str_gain}
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1 ">
              <div
                style={{
                  backgroundColor: "#ebe8e8",
                  padding: "6px",
                  borderRadius: "90%",
                }}
              >
                <GiWindyStripes size={20} color={"lime"} />
              </div>
              <div className="text-lg  text-white flex items-center">
                {detail?.base_agi} + {detail?.agi_gain}
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <div
                style={{
                  backgroundColor: "#ebe8e8",
                  padding: "6px",
                  borderRadius: "90%",
                }}
              >
                <FaWandMagicSparkles size={20} color={"skyblue"} />
              </div>
              <div className="text-lg  text-white flex items-center">
                {detail?.base_int} + {detail?.int_gain}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="text-lg  text-white">
                Attack Type : {detail?.attack_type}
              </div>
              {getAttackTypeIcon(detail?.attack_type)}
            </div>
            <div className="flex gap-2">
              <TbRulerMeasure size={23} color={"white"} />
              <div className="text-lg  text-white">
                Attack Range : {detail?.attack_range}
              </div>
            </div>
            <div className="flex gap-2">
              <GiSpeedometer size={23} color={"white"} />
              <div className="text-lg  text-white">
                Attack Speed : {detail?.base_attack_time}
              </div>
            </div>
            <div className="flex gap-2">
              <PiClockClockwiseBold size={23} color={"white"} />
              <div className="text-lg  text-white">
                Base Attack Time : {detail?.attack_rate}
              </div>
            </div>
            <div className="flex gap-2">
              <FaRunning size={23} color={"white"} />
              <div className="flex gap-2 items-center">
                <div className="text-lg  text-white">
                  Move Speed: {detail?.move_speed}
                </div>
                <IoSunny size={22} color={"white"} />
              </div>
              <div className="flex gap-2 items-center">
                <div className="text-lg  text-white">
                  / {detail?.move_speed + 30}
                </div>
                <IoMoonSharp size={19} color={"white"} />
              </div>
            </div>

            <div className="flex gap-2">
              <FaEye size={23} color={"white"} />
              <div className="flex gap-2 items-center">
                <div className="text-lg  text-white">
                  Vision Range: {detail?.day_vision}
                </div>
                <IoSunny size={22} color={"white"} />
              </div>
              <div className="flex gap-2 items-center">
                <div className="text-lg  text-white">
                  / {detail?.night_vision}
                </div>
                <IoMoonSharp size={19} color={"white"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HeroDetail;
