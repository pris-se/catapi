import React from "react";
import { Link, NavLink } from "react-router-dom";
import { API_URL, CAT_API_URL, DOG_API_URL } from "../store/petApi";

export default function Menu() {
  const changePet = (e) => {
    localStorage.setItem("api-url", e);
    window.location.reload();
  };

  return (
    <div className="menu">
      <header className="menu__header">
        <div className="logo">
          <Link to="/">
            <img src="./img/logo.svg" alt="PetsPaw" />
          </Link>
        </div>
        <div className="menu__switcher">
          <button
            className={API_URL === DOG_API_URL ? "menu__switch active" : "menu__switch"}
            value={DOG_API_URL}
            onClick={(e) => changePet(e.target.value)}
          >
            Dog
          </button>
          <button
            className={API_URL === CAT_API_URL ? "menu__switch active" : "menu__switch"}
            value={CAT_API_URL}
            onClick={(e) => changePet(e.target.value)}
          >
            Cat
          </button>
        </div>
      </header>
      <article className="menu__body">
        <h1 className="menu__title">Hi cat lovers!</h1>
        <h2 className="menu__subtitle">Welcome to cat social network</h2>
        <h2 className="menu__secondary-title">Lets start searching photos</h2>
        <section className="menu__links">
          <NavLink to="/votting" className={({ isActive }) => (isActive ? "active" : null)}>
            <div className="menu__link">
              <img className="menu__link--col-1" src="/img/vote-table.png" alt="VOTING" />
              <h3 className="menu__link-name">VOTING</h3>
            </div>
          </NavLink>
          <NavLink to="/breeds" className={({ isActive }) => (isActive ? "active" : null)}>
            <div className="menu__link">
              <img className="menu__link--col-2" src="./img/pet-breeds.png" alt="BREEDS" />
              <h3 className="menu__link-name" type="button">
                BREEDS
              </h3>
            </div>
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => (isActive ? "active" : null)}>
            <div className="menu__link">
              <img className="menu__link--col-3" src="./img/images-search.png" alt="GALLERY" />
              <h3 className="menu__link-name" type="button">
                GALLERY
              </h3>
            </div>
          </NavLink>
        </section>
      </article>
    </div>
  );
}
