import React, { useEffect, useState } from "react";
import Home from "./Home";
import Admin from "./Admin";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";

export default function Main() {
  const [userExists, setUserExists] = useState(false);
  const [{ userInfo }, dispatch] = useStateProvider();

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      setUserExists(true);
      const userInfoObj = JSON.parse(userInfoString); // Parse JSON string to object
      dispatch({
        // Dispatch action to set user info
        type: reducerCases.SET_USER_INFO,
        userInfo: userInfoObj, // Pass the user object
      });
    } else {
      setUserExists(false);
    }
  }, []);

  return userExists ? <Admin /> : <Home />;
}
