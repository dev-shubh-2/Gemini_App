import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";

function App() {
  return (
    <>
      <Sidebar />
      <Main></Main>
    </>
  );
}

export default App;
