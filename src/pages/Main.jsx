import React, { useEffect, useState } from "react";
import Home from "./Home";
import Admin from "./Admin";

export default function Main() {
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    // Lấy thông tin người dùng từ sessionStorage
    const userInfoString = localStorage.getItem("userInfo");
    // Kiểm tra xem giá trị có tồn tại không
    if (userInfoString) {
      setUserExists(true);
    } else {
      setUserExists(false);
    }
  }, []);

  return userExists ? <Admin /> : <Home />;
}
