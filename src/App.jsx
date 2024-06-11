import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StateProvider } from "./context/StateContext";
import reducer, { initialState } from "./context/StateReducers";
import AppRouter from "./router/AppRouter";
import { Helmet } from "react-helmet";

// Khởi tạo QueryClient bên ngoài hàm App để tránh việc khởi tạo lại không cần thiết
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Helmet>
          <title>Nails & Spa</title>
        </Helmet>
        <AppRouter />
      </StateProvider>
    </QueryClientProvider>
  );
}

export default App;
