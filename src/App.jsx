import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";

import DotaDB from "./DotaDB";
import HeroDetail from "./HeroDetail";
import HeroMatchup from "./HeroMatchup";
import Items from "./Items";
import ItemDetail from "./ItemDetail";
import { Home } from "./Home";
import Login from "./Login";
import Register from "./Register";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/heroes",
      element: isLoggedIn ? <DotaDB /> : <Navigate to="/login" />,
    },
    {
      path: "/hero-detail",
      element: isLoggedIn ? <HeroDetail /> : <Navigate to="/login" />,
    },
    {
      path: "/hero-matchup",
      element: isLoggedIn ? <HeroMatchup /> : <Navigate to="/login" />,
    },
    {
      path: "/items",
      element: isLoggedIn ? <Items /> : <Navigate to="/login" />,
    },
    {
      path: "/item-detail",
      element: isLoggedIn ? <ItemDetail /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ),
    },
    {
      path: "/register",
      element: isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <Register setIsLoggedIn={setIsLoggedIn} />
      ),
    },
  ]);

  return (
    <GoogleOAuthProvider clientId="577039318480-keloe0f9dbv0haradhntr0792eu1bfcs.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}
