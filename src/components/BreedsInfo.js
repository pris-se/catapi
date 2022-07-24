import React from "react";

export default function BreedsInfo() {
  return (
    <div className="breeds">
      <div className="breeds__slider">
        <img className="breeds__image" src="./img/loader.png" alt="loading" />
        <div className="breeds__buttons">
          <button className="breeds__button"></button>
          <button className="breeds__button active"></button>
          <button className="breeds__button"></button>
          <button className="breeds__button"></button>
          <button className="breeds__button"></button>
        </div>
      </div>
      <div className="breeds__description">
        <h1 className="breeds__title">Basenji</h1>
        <h2 className="breeds__subtitle">Family companion cat</h2>
        <div className="breeds__row">
          <div className="breeds__collumn">
            <p className="breeds__info">
              <span className="breeds__info--title">Temperament:</span> <br /> Active, Energetic, Independent, Intelligent, Gentle
            </p>
          </div>
          <div className="breeds__collumn">
            <p className="breeds__info">
              <span className="breeds__info--title">Origin:</span> United States
            </p>
            <p className="breeds__info">
              <span className="breeds__info--title">Weight:</span> 3 - 5 kgs
            </p>
            <p className="breeds__info">
              <span className="breeds__info--title">Life span:</span> 14 - 15 years
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
