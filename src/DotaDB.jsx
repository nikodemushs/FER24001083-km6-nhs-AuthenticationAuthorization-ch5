import { useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GiBiceps, GiWindyStripes } from "react-icons/gi";
import {
  FaGlobe,
  FaRecycle,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { PiArrowsDownUpBold } from "react-icons/pi";

const DotaDB = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

  const dotaHeroes = async () => {
    try {
      const response = await axios.get(
        `https://api.opendota.com/api/heroStats`,
        { headers: { accept: "application/json" } }
      );
      console.log("response data", response.data);
      setHeroes(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    dotaHeroes();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchTerm("");
  };

  let filteredHeroes = heroes
    .filter((hero) => {
      if (filter === "agi") {
        return hero.primary_attr === "agi";
      } else if (filter === "str") {
        return hero.primary_attr === "str";
      } else if (filter === "int") {
        return hero.primary_attr === "int";
      } else if (filter === "all") {
        return hero.primary_attr === "all";
      } else {
        return true;
      }
    })
    .filter((hero) =>
      hero.localized_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // const winRateA = a.wins / a.games_played;
      // const winRateB = b.wins / b.games_played;
      if (sortOrder === "asc") {
        return a.localized_name.localeCompare(b.localized_name); // Sort in ascending order
      } else {
        return b.localized_name.localeCompare(a.localized_name); // Sort in descending order
      }
    });
  const handleFilter = (type) => {
    setFilter(type);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div
      className="bg-cover bg-fixed bg-no-repeat bg-stone-500 bg-blend-multiply text-center h-full min-h-screen"
      style={{
        backgroundImage: `url('https://i.imgur.com/0uueOOL.jpeg')`,
        height: "",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div class=" flex flex-col rounded shadow-lg  md:p-10 space-y-4 backdrop-blur-sm bg-black/20 ">
        <h1 className="pt-28 pb-5 text-4xl font-bold tracking-tight leading-tight text-white md:text-5xl lg:text-6xl">
          Pick your favorite heroes!{" "}
        </h1>
        <form onSubmit={handleSearchSubmit} class="max-w-lg mx-auto ">
          <div class="flex flex-col justify-center items-center ">
            <div class="flex mr-[] items-center">
              <div className="flex items-center space-x-6">
                <div
                  onClick={toggleSortOrder}
                  class="text-white  bg-white hover:bg-gray-500  focus:outline-none focus:ring focus:ring-gray-600  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 hover:scale-110 "
                >
                  {isActive ? (
                    <FaSortAlphaDown
                      size={25}
                      color={"black"}
                      onClick={() => {
                        setIsActive(!isActive);
                      }}
                    />
                  ) : (
                    <FaSortAlphaUp
                      size={25}
                      color={"black"}
                      onClick={() => {
                        setIsActive(!isActive);
                      }}
                    />
                  )}
                </div>
              </div>
              <button
                onClick={() => handleFilter("ALL HERO")}
                type="button"
                class="text-white  bg-white hover:bg-gray-500  focus:outline-none focus:ring focus:ring-gray-600 focus:grayscale font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 hover:scale-110 "
              >
                <FaGlobe size={25} color={"black"} />
                <span class="sr-only">Icon description</span>
              </button>
              <button
                onClick={() => handleFilter("all")}
                type="button"
                class="text-white hover:scale-110 bg-gradient-to-b from-[#ef3a0e] from-20% via-[#32e239] to-80% to-[#1fd0ea] hover:from-[#1fd0ea] hover:from-20% hover:via-[#32e239] hover:to-[#ef3a0e] hover:to-80%  focus:outline-none focus:ring focus:ring-gray-600  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 focus:grayscale"
              >
                <div className="w-6 h-6 ">
                  <FaRecycle size={25} color={"white"} />
                </div>
                <span class="sr-only">Icon description</span>
              </button>
              <button
                onClick={() => handleFilter("str")}
                type="button"
                class="text-white hover:scale-110 bg-neutral-200 hover:bg-red-600  focus:outline-none focus:ring focus:ring-gray-600 focus:grayscale font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
              >
                <GiBiceps size={25} color={"#ef3a0e"} />
                <span class="sr-only">Icon description</span>
              </button>
              <button
                onClick={() => handleFilter("agi")}
                type="button"
                class="text-white hover:scale-110 bg-neutral-200 hover:bg-green-500  focus:outline-none focus:ring focus:ring-green-600 focus:grayscale  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
              >
                <GiWindyStripes size={25} color={"#32e239"} />
                <span class="sr-only">Icon description</span>
              </button>
              <button
                onClick={() => handleFilter("int")}
                type="button"
                class="text-white hover:scale-110 bg-neutral-200 hover:bg-sky-500  focus:outline-none focus:ring focus:ring-sky-600 focus:grayscale  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
              >
                <FaWandMagicSparkles size={25} color={"#1fd0ea"} />

                <span class="sr-only">Icon description</span>
              </button>
            </div>

            <form className="pt-4 w-[400px] font-family: Poppins font-sans ">
              <label
                for="search"
                class="mb-2 text-sm font-medium text-gray-900  sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search heroes..."
                  value={searchTerm}
                  onChange={handleSearch}
                  class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500 "
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-semibold rounded-lg text-sm px-4 py-1 "
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-5 gap-3  mx-10 ">
        {filteredHeroes.map((hero) => (
          <div
            key={hero?.id}
            className="relative flex flex-col items-center cursor-pointer shadow-lg hover:scale-105 duration-300"
            onClick={() => {
              navigate("/hero-detail", { state: { id: hero.id } });
            }}
          >
            <img
              src={`https://cdn.cloudflare.steamstatic.com${hero?.img}`}
              className="w-full h-full object-cover rounded-lg"
              alt={hero?.localized_name}
            />
            <div className="p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 rounded-lg">
              <p className="text-white text-center text-lg font-semibold">
                {hero?.localized_name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-[415px]">
        <Footer />
      </div>
    </div>
  );
};

export default DotaDB;
