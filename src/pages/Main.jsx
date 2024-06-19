import React, { useEffect, useState } from "react";
import Home from "./Home";
import Admin from "./Admin";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import axios from "axios";
import { USER_API } from "../router/ApiRoutes";
import ClipLoader from "react-spinners/ClipLoader";

export default function Main() {
  const [loading, setLoading] = useState(true); // State for loading
  const [userExists, setUserExists] = useState(false);
  const [{ userInfo }, dispatch] = useStateProvider();

  useEffect(() => {
    const checkToken = async () => {
      const userInfoString = localStorage.getItem("userInfo");

      if (userInfoString) {
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

            if (res.data.status) {
              setUserExists(true);
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
            } else {
              setUserExists(false);
            }
          } catch (error) {
            console.error("Error rechecking token:", error);
            setUserExists(false);
          }
        } else {
          console.error("Refresh token not found in userInfo.");
          setUserExists(false);
        }
      } else {
        setUserExists(false);
      }
      setLoading(false); // Set loading to false after checking token
    };

    checkToken();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader color="#36D7B7" loading={loading} size={50} />
      </div>
    );
  }

  return userExists ? <Admin /> : <Home />;
}
