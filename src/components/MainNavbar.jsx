import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Route, Routes, useNavigate, NavLink } from "react-router-dom";
import { setBreedsFilter } from "../store/mainState";
import { useGetBreedsQuery } from "../store/petApi";

export default function MainNavbar() {
  const dispatch = useDispatch();
  const breedsParams = useSelector((state) => state.state.breedsFilter);

  const { data } = useGetBreedsQuery();

  let navigate = useNavigate();
  const location = useLocation();
  const limits = [5, 10, 15, 20];

  const breedOptions = data?.map((breed) => (
    <option value={breed.id} key={breed.id}>
      {breed.name}
    </option>
  ));

  const limitOption = limits.map((l, id) => (
    <option value={l} key={id}>
      Limit: {l}
    </option>
  ));

  return (
    <nav className="main__navbar">
      <div className="main__aside">
        <button className="main__back-btn" type="button" onClick={() => navigate(-1)}>
          <img src="./img/back-btn.svg" alt="Back" />
        </button>
        <h2 className="main__title">{location.pathname.toUpperCase().slice(1)}</h2>
      </div>
      <Routes>
        <Route
          path="breedsinfo"
          element={
            <h2 className="main__title">{JSON.parse(window.localStorage.getItem("breedInfo"))}</h2>
          }
        />
        <Route
          path="breeds"
          element={
            <>
              <select
                className="main__select main__select--w100"
                value={breedsParams.breed_ids}
                onChange={(e) => dispatch(setBreedsFilter({ breed_ids: e.target.value }))}
              >
                <option value="">All breeds</option>
                {breedOptions}
              </select>
              <select
                className="main__select"
                value={breedsParams.limit}
                onChange={(e) => dispatch(setBreedsFilter({ limit: e.target.value }))}
              >
                {limitOption}
              </select>
              <button
                className={breedsParams.order === "Ask" ? "main__select" : "main__select disable"}
                value="Ask"
                onClick={() => dispatch(setBreedsFilter({ order: "Ask" }))}
              >
                <img src="./img/sort-ask-active.svg" alt="asc" />
              </button>
              <button
                className={breedsParams.order === "Desk" ? "main__select" : "main__select disable"}
                onClick={() => dispatch(setBreedsFilter({ order: "Desk" }))}
              >
                <img src="./img/sort-dec-active.svg" alt="dec" />
              </button>
            </>
          }
        />
        <Route
          path="gallery"
          element={
            <NavLink to="/upload" className="main__upload-btn">
              <img src="./img/upload.svg" alt="upload" /> UPLOAD
            </NavLink>
          }
        />
      </Routes>
    </nav>
  );
}
