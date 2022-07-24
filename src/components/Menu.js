import React from "react";

export default function Menu({ status, setStatus }) {
  return (
    <div className="menu">
      <div className="logo">
        <img src="./img/logo.svg" alt="PetsPaw" />
      </div>
      <article className="menu__body">
        <h1 className="menu__title">Hi intern!</h1>
        <h2 className="menu__subtitle">Welcome to MI 2022 Front-end test</h2>
        <h2 className="menu__secondary-title">Lets start using The Cat API</h2>
        <section className="menu__links">
          <div className={status === "VOTTING" ? "menu__link active" : "menu__link"} onClick={() => setStatus("VOTTING")}>
            <img className="menu__link--col-1" src="./img/vote-table.png" alt="VOTING" />
            <h3 className="menu__link-name">VOTING</h3>
          </div>
          <div className={status === "BREEDS" ? "menu__link active" : "menu__link"} onClick={() => setStatus("BREEDS")}>
            <img className="menu__link--col-2" src="./img/pet-breeds.png" alt="BREEDS" />
            <h3 className="menu__link-name" type="button">
              BREEDS
            </h3>
          </div>
          <div className={status === "GALLERY" ? "menu__link active" : "menu__link"} onClick={() => setStatus("GALLERY")}>
            <img className="menu__link--col-3" src="./img/images-search.png" alt="GALLERY" />
            <h3 className="menu__link-name" type="button">
              GALLERY
            </h3>
          </div>
        </section>
      </article>
    </div>
  );
}
