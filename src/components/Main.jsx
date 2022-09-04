import React from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
import BreedsInfo from "./BreedsInfo";
import Filter from "./Filter";
import Gallery from "./Gallery";
import Likes from "./Likes";
import Favourite from "./Favourite";
import Dislikes from "./Dislikes";
import MainHeader from "./MainHeader";
import MainNavbar from "./MainNavbar";
import Votting from "./Votting";
import Breeds from "./Breeds";
import Search from "./Search";

export const Main = () => {
  let navigate = useNavigate();
  const handleInfo = (breed) => {
    window.localStorage.setItem("breedInfo", JSON.stringify(breed));
    navigate("/breedsinfo", { replace: true });
  };

  return (
    <div className="main">
      <div className="main__container">
        <MainHeader />
        <div className="main__body">
          <MainNavbar />
          <Routes>
            <Route path="votting" element={<Votting />} />
            <Route
              path="gallery"
              element={
                <>
                  <Filter />
                  <Gallery />
                </>
              }
            />
            <Route path="breeds" element={<Breeds handleInfo={handleInfo} />} />
            <Route path="search" element={<Search handleInfo={handleInfo} />} />
            <Route path="likes" element={<Likes />} />
            <Route path="favourite" element={<Favourite />} />
            <Route path="dislikes" element={<Dislikes />} />
            <Route path="breedsinfo" element={<BreedsInfo />} />
            <Route path="*" element={<div>No Page Found</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
