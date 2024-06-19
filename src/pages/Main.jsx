import React, { useEffect, useState } from "react";
import Home from "./Home";
import Admin from "./Admin";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import axios from "axios";
import { USER_API } from "../router/ApiRoutes";

export default function Main() {
  const [userExists, setUserExists] = useState(false);
  const [{ userInfo }, dispatch] = useStateProvider();

  useEffect(() => {
    const checkToken = async () => {
      const userInfoString = localStorage.getItem("userInfo");

      if (userInfoString) {
        setUserExists(true);
        const userInfoObj = JSON.parse(userInfoString); // Parse JSON string to object

        if (userInfoObj.refreshToken) {
          try {
            const res = await axios.post(
              USER_API + "checktoken",
              {}, // Empty body for POST request
              {
                headers: {
                  Authorization: `Bearer ${userInfoObj.refreshToken}`,
                },
              }
            );
            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: {
                refreshToken: userInfoObj.refreshToken,
                accessToken: res.data.token.accessToken,
                role: res.data.token.role,
              },
            });
            localStorage.setItem(
              "userInfo",
              JSON.stringify({
                refreshToken: userInfoObj.refreshToken,
                accessToken: res.data.token.accessToken,
              })
            );
          } catch (error) {
            console.error("Error rechecking token:", error);
          }
        } else {
          console.error("Refresh token not found in userInfo.");
        }
      } else {
        setUserExists(false);
      }
    };

    checkToken();
  }, []);

  return userExists ? <Admin /> : <Home />;
}
