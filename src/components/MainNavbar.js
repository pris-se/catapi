import React, { useEffect, useState } from "react";

export default function MainNavbar({ status, breeds, getData, setStatus }) {
  let [options, setOptions] = useState({
    breed_ids: "",
    limit: 5,
    order: "Rand",
    mime_types: "",
  });
  const limits = [5, 10, 15, 20];
  const breedOptions = breeds.map((breed) => (
    <option value={breed.id} key={breed.id}>
      {breed.name}
    </option>
  ));

  const limitOption = limits.map((l, id) => (
    <option value={l} key={id}>
      Limit: {l}
    </option>
  ));

  useEffect(() => {
    getData(options);
  }, [options]);

  return (
    <nav className="main__navbar">
      <div className="main__aside">
        <button className="main__back-btn" type="button" onClick={() => setStatus("")}></button>
        <h2 className="main__title">{status}</h2>
      </div>
      {status === "BREEDS" && (
        <>
          <select
            className="main__select main__select--w100"
            value={options.breed_ids}
            onChange={(e) => setOptions({ ...options, breed_ids: e.target.value })}
          >
            <option value="none">All breeds</option>
            {breedOptions}
          </select>
          <select className="main__select" name="breeds" value={options.limit} onChange={(e) => setOptions({ ...options, limit: e.target.value })}>
            {limitOption}
          </select>
          <button className="main__select" name="breeds" value="Ask" onClick={(e) => setOptions({ ...options, order: e.target.value })}>
            <img src="./img/sort-inc.svg" alt="&uarr;" />
          </button>
          <button className="main__select" name="breeds" value="Desk" onClick={(e) => setOptions({ ...options, order: e.target.value })}>
            <img src="./img/sort-dec.svg" alt="&darr;" />
          </button>
        </>
      )}
      {status === "GALLERY" && (
        <button className="main__upload-btn" type="button">
          <img src="./img/upload.svg" alt="upload" /> UPLOAD
        </button>
      )}
    </nav>
  );
}
