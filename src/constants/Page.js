import Login from "../pages/Login";
import Main from "../pages/Main";
import Product from "../pages/Product";

const MAIN_PAGE = {
  name: "MAIN_PAGE",
  displayName: "Main page",
  path: "/",
  element: <Main />,
};
const PRODUCT_PAGE = {
  name: "PRODUCT_PAGE",
  displayName: "Main page",
  path: "/product",
  element: <Product />,
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
  PRODUCT_PAGE,
};

export default Page;
