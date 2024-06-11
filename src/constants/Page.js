import Login from "../pages/Login";
import Main from "../pages/Main";

const MAIN_PAGE = {
  name: "MAIN_PAGE",
  displayName: "Main page",
  path: "/",
  element: <Main />,
};
const LOGIN_PAGE = {
  name: "LOGIN_PAGE",
  displayName: "Login Page",
  path: "/login",
  element: <Login />,
};

const Page = {
  MAIN_PAGE,
  LOGIN_PAGE,
};

export default Page;
