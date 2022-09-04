import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, Route, Routes, useNavigate } from "react-router-dom";
import { useGetBreedsQuery } from "../store/petApi";

export default function MainNavbar() {
  const { data } = useGetBreedsQuery();
  const [options, setOptions] = useState({
    limits: 5,
    breed_ids: "",
  });
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

  useEffect(() => {}, []);

  return (
    <nav className="main__navbar">
      <div className="main__aside">
        <button className="main__back-btn" type="button" onClick={() => navigate(-1)}></button>
        <h2 className="main__title">{location.pathname.toUpperCase().slice(1)}</h2>
      </div>
      <Routes>
        <Route
          path="breeds"
          element={
            <>
              <select
                className="main__select main__select--w100"
                value={options.breed_ids}
                onChange={(e) => setOptions({ ...options, breed_ids: e.target.value })}
              >
                <option value="">All breeds</option>
                {breedOptions}
              </select>
              <select
                className="main__select"
                value={options.limit}
                onChange={(e) => setOptions({ ...options, limit: e.target.value })}
              >
                {limitOption}
              </select>
            </>
          }
        />
        <Route
          path="gallery"
          element={
            <button className="main__upload-btn" type="button">
              <img src="./img/upload.svg" alt="upload" /> UPLOAD
            </button>
          }
        />
      </Routes>
    </nav>
  );
}
