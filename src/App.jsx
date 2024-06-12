import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StateProvider } from "./context/StateContext";
import reducer, { initialState } from "./context/StateReducers";
import AppRouter from "./router/AppRouter";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Khởi tạo QueryClient bên ngoài hàm App để tránh việc khởi tạo lại không cần thiết
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Helmet>
            <title>Nails & Spa</title>
            <link rel="shortcut icon" href="/logo.jpg" />
          </Helmet>
          <AppRouter />
        </StateProvider>
      </QueryClientProvider>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
    </>
  );
}

export default App;
