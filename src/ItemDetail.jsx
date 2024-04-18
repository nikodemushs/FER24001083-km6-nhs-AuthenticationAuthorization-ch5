import { useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { data } from "./Data";
import { GiBiceps, GiWindyStripes } from "react-icons/gi";
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortAmountDown,
  FaSortAmountUp,
  FaCoins,
} from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const ItemDetail = () => {
  const navigate = useNavigate();
  let location = useLocation();
  console.log("location", location);

  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState(data);
  const [filter, setFilter] = useState("All");
  const [sortCost, setSortCost] = useState("desc");
  const [sortName, setSortName] = useState("asc");
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [detail, setDetail] = useState(null);

  //   const dotaItems = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.opendota.com/api/heroStats`,
  //         { headers: { accept: "application/json" } }
  //       );
  //       console.log("response data", response.data);
  //       setItems(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data", error);
  //     }
  //   };

  //   useEffect(() => {
  //     // dotaItems();
  //   }, []);

  useEffect(() => {
    const flattenedItems = data.flatMap((item) => Object.values(item));

    // Find the item in the local database based on the provided ID
    console.log("flattened items", flattenedItems);
    const selectedItem = flattenedItems.find(
      (item) => item?.id === location?.state?.id
    );
    setDetail(selectedItem);
  }, [location?.state?.id]);
  console.log("detail", detail);
  console.log("data mentah", data);

  const flattenedItems = data.flatMap((item) => Object.values(item));

  if (!detail) {
    return <div>Loading...</div>;
  }

  const navigateToItemDetail = (id) => {
    navigate("/item-detail", {
      state: { id },
    });
  };

  return (
    <div
      className="bg-cover bg-fixed bg-no-repeat bg-stone-500 bg-blend-multiply  h-full min-h-screen"
      style={{
        backgroundImage: `url('https://i.imgur.com/0uueOOL.jpeg')`,
        height: "",
      }}
    >
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div class=" flex flex-col rounded shadow-lg  md:p-10 space-y-4 backdrop-blur-sm bg-black/60 ">
          <div className="grid grid-cols-2 container mx-auto text-white">
            <div className="">
              <div className="flex flex-1 items-center space-y-1 ">
                <div className="">
                  <img
                    src={`https://cdn.cloudflare.steamstatic.com${detail?.img}`}
                    className="w-64 h-auto rounded-lg object-cover "
                    alt={detail?.dname}
                  />
                </div>
                <div className="pl-5 space-y-1 ">
                  <h1 className="text-3xl font-semibold ">{detail?.dname}</h1>
                  <p>{detail?.lore}</p>
                  {detail?.cost !== 0 && (
                    <p className="flex items-center gap-2">
                      Cost: {detail?.cost} <FaCoins />
                    </p>
                  )}
                  {detail?.cost !== 0 && (
                    <p className="flex items-center gap-2">
                      Sell Cost: {Math.floor(detail?.cost / 2)} <FaCoins />
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                {(detail?.hint?.length > 0 ||
                  (detail?.notes && detail?.notes !== "")) && (
                  <h3 className="text-xl font-semibold pt-5 ">Ability:</h3>
                )}
                {detail?.hint?.length > 0 && <li>{detail.hint[0]}</li>}
                {detail?.notes && detail?.notes !== "" && (
                  <li>Notes: {detail?.notes}</li>
                )}
                {((detail && detail.behavior) ||
                  detail.mc ||
                  detail.hc ||
                  detail.cd) && (
                  <div>
                    <div className="text-xl font-semibold">Behavior:</div>
                    {detail && detail.behavior && (
                      <ul>
                        {Array.isArray(detail.behavior) ? (
                          detail.behavior.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))
                        ) : (
                          <li>{detail.behavior}</li>
                        )}
                      </ul>
                    )}

                    {detail?.mc && <li>Mana Cost: {detail?.mc} Mana</li>}
                    {detail?.hc && <li>Health Cost: {detail?.hc} Health </li>}
                    {detail?.cd && <li>Cooldown: {detail?.cd} s</li>}
                  </div>
                )}

                <Link to="/items" state={{ id: detail?.id }}>
                  <button className="mt-7 px-4 py-2  font-sans bg-white border border-solid border-gray-400 text-black rounded-md shadow-md hover:bg-gray-400 hover:border-gray-500 focus:outline-none focus:ring focus:ring-gray-300 hover:scale-105">
                    <div className="w-5 h-5 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          transform="rotate(180 256 256)"
                          d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                        />
                      </svg>
                    </div>
                    <span class="sr-only">Icon description</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="pl-5 ">
              {detail?.components &&
                detail.components.some(
                  (component) =>
                    component !== null && data[0]?.[component]?.cost !== 0
                ) && (
                  <div className="text-xl font-semibold pb-2">Component: </div>
                )}

              <div className="grid grid-cols-4 gap-3   ">
                {detail?.components &&
                  detail.components.map((component, index) => {
                    if (
                      component !== null &&
                      data[0]?.[component]?.cost !== 0
                    ) {
                      return (
                        <div
                          onClick={() => {
                            console.log("data", data);
                            console.log("component", component);
                            navigate("/item-detail", {
                              state: { id: data[0][component]?.id },
                            });
                          }}
                          className="relative flex flex-col items-center cursor-pointer shadow-lg hover:scale-105 duration-300"
                          key={index}
                        >
                          <img
                            src={`https://cdn.cloudflare.steamstatic.com${data[0][component]?.img}`}
                            className="w-[220px] h-auto object-cover rounded-lg"
                            alt={data[0][component]?.dname}
                          />
                          <div className="p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 rounded-lg">
                            <div className="flex flex-col">
                              <div className="text-white text-center text-lg font-semibold">
                                {data[0][component]?.dname}
                              </div>
                              <p className="text-white text-center text-lg font-semibold flex items-center gap-2 justify-center">
                                {data[0][component]?.cost} <FaCoins />
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>

              <div className="space-y-1">
                {detail?.attrib && detail.attrib.length > 0 && (
                  <h3 className="text-xl font-semibold pt-5 ">Attributes:</h3>
                )}

                <div className="">
                  {detail?.attrib &&
                    detail.attrib.map((attribute, index) => (
                      <li key={index}>
                        <strong>{attribute.header}</strong>{" "}
                        {attribute.display
                          ? attribute.display.replace(
                              "{value}",
                              attribute.value
                            )
                          : attribute.value}
                      </li>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetail;
