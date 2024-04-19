import React from "react";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";

function Facebook({ buttonText }) {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log("Login Success!", response);
    const { accessToken } = response;
    localStorage.setItem("login", "facebook function");
    localStorage.setItem("token", accessToken);
    navigate("/", { state: { token: accessToken } });
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failed!", error);
  };

  const handleProfileSuccess = (response) => {
    console.log("Get Profile Success!", response);
    const profileString = JSON.stringify(response);
    localStorage.setItem("profile", profileString);
  };

  return (
    <FacebookLogin
      appId="1178466979811829"
      onSuccess={handleLoginSuccess}
      onFail={handleLoginFailure}
      onProfileSuccess={handleProfileSuccess}
    >
      {" "}
      {buttonText}
    </FacebookLogin>
  );
}

export default Facebook;
