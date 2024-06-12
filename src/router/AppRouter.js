import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Page from "../constants/Page";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={Page.PRODUCT_PAGE.path}
          element={Page.PRODUCT_PAGE.element}
        />
        <Route path={Page.LOGIN_PAGE.path} element={Page.LOGIN_PAGE.element} />
        <Route path={Page.MAIN_PAGE.path} element={Page.MAIN_PAGE.element} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
