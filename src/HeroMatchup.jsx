import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { PiArrowsDownUpBold } from "react-icons/pi";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";

const HeroMatchup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [matchups, setMatchups] = useState([]);
  const [heroesData, setHeroesData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortWin, setSortWin] = useState("desc");
  const [sortName, setSortName] = useState("asc");

  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

  // Function to fetch matchup data
  const fetchMatchupData = async () => {
    try {
      const response = await axios.get(
        `https://api.opendota.com/api/heroes/${location.state.id}/matchups`,
        { headers: { accept: "application/json" } }
      );
      console.log("response data", response.data);
      setMatchups(response.data);

      // Fetch hero details for each matchup hero
      const heroIds = response.data.map((matchups) => matchups.hero_id);
      await fetchHeroDetails(heroIds);
    } catch (error) {
      console.error("Error fetching matchup data", error);
    }
  };

  // Function to fetch hero details
  const fetchHeroDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.opendota.com/api/heroStats`,
        { headers: { accept: "application/json" } }
      );
      console.log("hero details", response.data);
      // Create a map of hero details using hero ID as key
      const heroesMap = {};
      response.data.forEach((hero) => {
        heroesMap[hero.id] = hero;
      });
      setHeroesData(heroesMap);
    } catch (error) {
      console.error("Error fetching hero details", error);
    }
  };

  useEffect(() => {
    fetchMatchupData();
    console.log("hero data", heroesData);
  }, [location.state.id]);

  const trueheroId = location.state.id;
  const trueheroData = heroesData[trueheroId] || {};

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchTerm("");
  };

  let filteredMatchups = matchups

    .filter((matchup) =>
      heroesData[matchup.hero_id]?.localized_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const winRateA = a.wins / a.games_played;
      const winRateB = b.wins / b.games_played;
      if (sortWin === "asc") {
        return winRateA - winRateB; // Sort in ascending order
      } else {
        return winRateB - winRateA; // Sort in descending order
      }
    });
  const toggleSortWin = () => {
    setSortWin(sortWin === "asc" ? "desc" : "asc");
  };

  return (
    <div
      className="bg-cover bg-fixed bg-no-repeat bg-stone-500 bg-blend-multiply text-center h-full  min-h-screen "
      style={{
        backgroundImage: `url('https://i.imgur.com/0uueOOL.jpeg')`,
        height: "",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div
        div
        class=" flex flex-col rounded shadow-lg  md:p-10 space-y-4 backdrop-blur-sm bg-black/20 "
      >
        <div className="flex flex-col gap-4 items-center justify-center pt-24">
          <img
            src={`https://cdn.cloudflare.steamstatic.com${trueheroData?.img}`}
            className="w-auto h-48 rounded-lg "
            alt={trueheroData?.localized_name}
          />
          <div className="text-white text-4xl font-bold tracking-tight leading-tight pb-5">
            {trueheroData?.localized_name}'s Matchups
          </div>
          <div className="flex gap-3 justify-center items-center">
            <div className="flex items-center ">
              <div
                onClick={toggleSortWin}
                class="text-white  bg-white hover:bg-gray-500  focus:outline-none focus:ring focus:ring-gray-600  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center hover:scale-110 "
              >
                {isActive ? (
                  <FaSortAmountDown
                    size={25}
                    color={"black"}
                    onClick={() => {
                      setIsActive(!isActive);
                    }}
                  />
                ) : (
                  <FaSortAmountUp
                    size={25}
                    color={"black"}
                    onClick={() => {
                      setIsActive(!isActive);
                    }}
                  />
                )}
              </div>
            </div>

            <form className=" w-[400px] font-family: Poppins font-sans ">
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
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 mx-10 ">
        {filteredMatchups.map((matchup) => {
          const heroId = matchup.hero_id;
          const heroData = heroesData[heroId] || {};
          if (!heroData) return null;
          return (
            <div
              key={matchup?.hero_id}
              className="relative flex flex-col items-center cursor-pointer shadow-lg hover:scale-105 duration-300"
              onClick={() => {
                navigate("/hero-detail", { state: { id: heroId } });
              }}
            >
              <img
                src={`https://cdn.cloudflare.steamstatic.com${heroData?.img}`}
                className="w-full h-48 object-cover rounded-lg"
                alt={heroData?.localized_name}
              />
              <div className="p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-75 rounded-lg">
                <div className="text-white text-center text-lg font-semibold">
                  Againts {heroData?.localized_name}
                </div>
                <div className="text-white text-center text-lg font-semibold">
                  Win Rate :{" "}
                  {((matchup?.wins / matchup?.games_played) * 100).toFixed(2)}%
                </div>
                <div className="text-white text-center text-lg font-semibold">
                  Out of {matchup?.games_played} Games
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pt-[415px]">
        <Footer />
      </div>
    </div>
  );
};

export default HeroMatchup;
