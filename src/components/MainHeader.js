import React, { useState } from "react";
import {} from "../store";

export default function MainHeader({ searchByName, setStatus }) {
  let [searchFor, setSearchFor] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchFor.length > 0) {
      searchByName(searchFor);
      setStatus("SEARCH");
      setSearchFor("");
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
          value={searchFor}
          onInput={(e) => setSearchFor(e.target.value.trim())}
        />
        <button className="main__search-btn" type="submit">
          <img src="./img/search.png" alt="search" />
        </button>
      </form>
      <div className="main__icons">
        <button className="main__icon" type="button" onClick={() => setStatus("LIKES")}>
          <img src="./img/like.svg" alt="like" />
        </button>
        <button className="main__icon" type="button" onClick={() => setStatus("FAVOURITES")}>
          <img src="./img/favourite.svg" alt="favourite" />
        </button>
        <button className="main__icon" type="button" onClick={() => setStatus("DISLIKES")}>
          <img src="./img/dislike.svg" alt="dislike" />
        </button>
      </div>
    </header>
  );
}
