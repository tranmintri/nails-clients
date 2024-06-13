import Login from "../pages/Login";
import Main from "../pages/Main";
import Product from "../pages/Product";
import Service from "../pages/Service";

const MAIN_PAGE = {
  name: "MAIN_PAGE",
  displayName: "Main page",
  path: "/",
  element: <Main />,
};
const PRODUCT_PAGE = {
  name: "PRODUCT_PAGE",
  displayName: "Product page",
  path: "/product",
  element: <Product />,
};
const SERVICE_PAGE = {
  name: "SERVICE_PAGE",
  displayName: "Serivce page",
  path: "/service",
  element: <Service />,
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
  SERVICE_PAGE,
};

export default Page;
