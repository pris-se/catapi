import { React } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Main } from "./components/Main";
import Menu from "./components/Menu";

const App = () => {
  const isNightTheme = useSelector((state) => state.state.isNightTheme);
  const isMenuOpen = useSelector((state) => state.state.isMenuOpen);
  return (
    <div className={isNightTheme ? "layout night-theme" : "layout light-theme"}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="aside">
                <Menu />
              </div>
              <div className="main hidden">
                {/* <img src="./img/girl-and-pet.png" alt="" /> */}
                <div className="main__container"></div>
              </div>
            </>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <div className={isMenuOpen ? "aside visible" : "aside hidden"}>
                <Menu />
              </div>
              <Main />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
