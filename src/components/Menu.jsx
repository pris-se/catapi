import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toggleTheme } from "../store/mainState";
import { API_URL, CAT_API_URL, DOG_API_URL } from "../store/petApi";

export default function Menu() {
  const isNightTheme = useSelector((state) => state.state.isNightTheme);
  const dispatch = useDispatch();

  const changePetHandler = (e) => {
    localStorage.setItem("api-url", e);
    window.location.reload();
  };
  const changeThemeHandler = (e) => {
    dispatch(toggleTheme());
    localStorage.setItem("isNightTheme", e.target.checked);
  };

  return (
    <div className="menu">
      <header className="menu__header">
        <div className="logo">
          <Link to="/">
            {!isNightTheme && <img src="./img/logo.svg" alt="PetsPaw" />}
            {isNightTheme && <img src="./img/logo-white.svg" alt="PetsPaw" />}
          </Link>
        </div>
        <div className="menu__switcher">
          <button
            className={API_URL === DOG_API_URL ? "menu__switch active" : "menu__switch"}
            value={DOG_API_URL}
            onClick={(e) => changePetHandler(e.target.value)}
          >
            Dog
          </button>
          <button
            className={API_URL === CAT_API_URL ? "menu__switch active" : "menu__switch"}
            value={CAT_API_URL}
            onClick={(e) => changePetHandler(e.target.value)}
          >
            Cat
          </button>
        </div>
        <div className="theme">
          <div className="theme__image">
            {!isNightTheme && <img src="./img/day-theme.svg" alt="light-theme" />}
            {isNightTheme && <img src="./img/night-theme.svg" alt="night-theme" />}
          </div>
          <label className="theme__switcher">
            <input type="checkbox" checked={isNightTheme} onChange={(e) => changeThemeHandler(e)} />
            <span></span>
          </label>
        </div>
      </header>
      <article className="menu__body">
        <h1 className="menu__title">Hi {API_URL === DOG_API_URL ? "dog" : "cat"} lovers!</h1>
        <h2 className="menu__subtitle">Welcome to pet social network</h2>
        <h2 className="menu__secondary-title">Lets start searching photos</h2>
        <section className="menu__links">
          <NavLink
            to="/votting"
            className={({ isActive }) => (isActive ? "menu__link active" : "menu__link")}
          >
            <img className="menu__link--col-1" src="/img/vote-table.png" alt="VOTING" />
            <h3 className="menu__link-name">VOTING</h3>
          </NavLink>
          <NavLink
            to="/breeds"
            className={({ isActive }) => (isActive ? "menu__link active" : "menu__link")}
          >
            <img className="menu__link--col-2" src="./img/pet-breeds.png" alt="BREEDS" />
            <h3 className="menu__link-name" type="button">
              BREEDS
            </h3>
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) => (isActive ? "menu__link active" : "menu__link")}
          >
            <img className="menu__link--col-3" src="./img/images-search.png" alt="GALLERY" />
            <h3 className="menu__link-name" type="button">
              GALLERY
            </h3>
          </NavLink>
        </section>
      </article>
    </div>
  );
}
