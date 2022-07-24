import { React, useState } from "react";
import MainBody from "./components/MainBody";
import Menu from "./components/Menu";
import {} from "./store";
const App = () => {
  let [status, setStatus] = useState("");

  return (
    <>
      <div className="aside">
        <Menu status={status} setStatus={setStatus} />
      </div>
      <div className="wrapper">
        <div className={!status ? "main hidden" : "main"}>
          <div className="main__container">{!!status && <MainBody setStatus={setStatus} status={status} />}</div>
        </div>
      </div>
    </>
  );
};

export default App;
