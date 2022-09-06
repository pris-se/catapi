import { React } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Main } from "./components/Main";
import Menu from "./components/Menu";
import { Upload } from "./components/Upload";
const App = () => {
  const isNightTheme = useSelector((state) => state.state.isNightTheme);
  return (
    <div className={isNightTheme ? "layout night-theme" : "layout light-theme"}>
      <div className="aside">
        <Menu />
      </div>
      <div className="wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <div className="main hidden">
                <img src="./img/girl-and-pet.png" alt="" />
                <div className="main__container"></div>
              </div>
            }
          />
          <Route path="/*" element={<Main />} />
          <Route path="upload" element={<Upload />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
