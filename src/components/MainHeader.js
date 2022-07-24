import React, { useState } from "react";
import {} from "../store";

export default function MainHeader({ breeds, searchByName, setStatus }) {
  let [breedName, setBreedName] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (breedName) {
      searchByName(breedName);
      setStatus("SEARCH");
    } else return;
  };
  return (
    <header className="main__header">
      <form className="main__search" onSubmit={(e) => submitHandler(e)}>
        <input
          required
          className="main__input"
          type="search"
          name="q"
          placeholder="Search for breeds by name"
          value={breedName}
          onInput={(e) => setBreedName(e.target.value.trim())}
        />
        <button className="main__search-btn" type="submit">
          <img src="./img/search.png" alt="search" />
        </button>
      </form>
      <div className="main__icons">
        <button className="main__icon" type="button">
          <img src="./img/like.svg" alt="like" />
        </button>
        <button className="main__icon" type="button">
          <img src="./img/favourite.svg" alt="favourite" />
        </button>
        <button className="main__icon" type="button">
          <img src="./img/dislike.svg" alt="dislike" />
        </button>
      </div>
    </header>
  );
}
