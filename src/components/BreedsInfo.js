import React from "react";

export default function BreedsInfo({ breed }) {
  return (
    <div className="breeds">
      <div className="breeds__slider">
        <img className="breeds__image" src={breed?.image?.url} alt={breed.name} />
        <div className="breeds__buttons">
          <button className="breeds__button"></button>
          <button className="breeds__button active"></button>
          <button className="breeds__button"></button>
          <button className="breeds__button"></button>
          <button className="breeds__button"></button>
        </div>
      </div>
      <div className="breeds__description">
        <h1 className="breeds__title">{breed.name}</h1>
        <h2 className="breeds__subtitle">{breed.alt_names}</h2>
        <div className="breeds__row">
          <div className="breeds__collumn">
            <p className="breeds__info">
              <span className="breeds__info--title">Temperament:</span> <br />
              {breed.temperament}
            </p>
          </div>
          <div className="breeds__collumn">
            <p className="breeds__info">
              <span className="breeds__info--title">Origin:</span> {breed.origin}
            </p>
            <p className="breeds__info">
              <span className="breeds__info--title">Weight:</span> {breed?.weight?.metric} kg
            </p>
            <p className="breeds__info">
              <span className="breeds__info--title">Life span:</span> {breed.life_span}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
