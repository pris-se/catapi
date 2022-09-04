import { React } from "react";
import { Routes, Route } from "react-router-dom";
import { Main } from "./components/Main";
import Menu from "./components/Menu";
const App = () => {
  return (
    <>
      <div className="aside">
        <Menu />
      </div>
      <div className="wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <div className="main hidden">
                <div className="main__container"></div>
              </div>
            }
          />
          <Route path="/*" element={<Main />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
