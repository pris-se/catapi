import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { search } from "../store/mainState";

export default function MainHeader() {
  let [searchFor, setSearchFor] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    const input = e.target.q.value;
    e.preventDefault();
    if (searchFor.length > 0) {
      dispatch(search(input));
      setSearchFor("");
      navigate("/search", { replace: true });
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
        <NavLink
          to="/likes"
          className={({ isActive }) => (isActive ? "main__icon active" : "main__icon")}
        >
          <img src="./img/like.svg" alt="like" />
        </NavLink>
        <NavLink
          to="/favourite"
          className={({ isActive }) => (isActive ? "main__icon active" : "main__icon")}
        >
          <img src="./img/favourite.svg" alt="favourite" />
        </NavLink>
        <NavLink
          to="/dislikes"
          className={({ isActive }) => (isActive ? "main__icon active" : "main__icon")}
        >
          <img src="./img/dislike.svg" alt="dislike" />
        </NavLink>
      </div>
    </header>
  );
}
