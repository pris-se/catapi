import React, { useEffect } from "react";

export default function MainNavbar({ status, breeds, setOptions, setStatus, options, setBreed }) {
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

  const handlerGoBack = () => {
    // setStatus("");
    setBreed("");
  };

  useEffect(() => {
    if (status === "BREEDS") {
      setOptions(options);
    }
  }, [options]);

  return (
    <nav className="main__navbar">
      <div className="main__aside">
        <button className="main__back-btn" type="button" onClick={handlerGoBack}></button>
        <h2 className="main__title">{status}</h2>
      </div>
      {status === "BREEDS" && (
        <>
          <select
            className="main__select main__select--w100"
            value={options.breed_ids}
            onChange={(e) => setOptions({ ...options, breed_ids: e.target.value })}
          >
            <option value="">All breeds</option>
            {breedOptions}
          </select>
          <select className="main__select" value={options.limit} onChange={(e) => setOptions({ ...options, limit: e.target.value })}>
            {limitOption}
          </select>
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
