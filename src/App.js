import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import React from 'react'
import { RecoilRoot } from "recoil";
function App() {
  return (
    <>
      <RecoilRoot>
        <AuthContextProvider>
          <Navbar />
          <Outlet />
        </AuthContextProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
