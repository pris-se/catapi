import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useGetImageQuery } from "../store/petApi";

export default function BreedsInfo() {
  const [slide, setSlide] = useState(0);

  const breed = JSON.parse(window.localStorage.getItem("breedInfo"));

  const { data, isLoading, isError } = useGetImageQuery({ limit: 10, id: breed?.id });

  const images = data?.map((img) => (
    <img className="breeds__image" src={img?.url} key={img?.id} alt={img?.breeds?.name} />
  ));

  const buttons = data?.map((b, idx) => (
    <button
      className={slide === idx ? "breeds__button active" : "breeds__button"}
      key={b.id}
      onClick={() => setSlide(idx)}
    ></button>
  ));

  useEffect(() => {
    console.log("slide", slide);
  }, [slide]);

  return (
    <div className="breeds">
      <div className="breeds__slider">
        {!isLoading && images[slide]}
        {isLoading && <img className="breeds__image" src="./img/upload-bg.png" alt="loading" />}
        <div className="breeds__buttons">{buttons}</div>
      </div>
      <div className="breeds__description">
        <h1 className="breeds__title">{breed?.name}</h1>
        <h2 className="breeds__subtitle">{breed?.alt_names}</h2>
        <div className="breeds__row">
          <div className="breeds__collumn">
            <p className="breeds__info">
              <span className="breeds__info--title">Temperament:</span> <br />
              {breed?.temperament}
            </p>
          </div>
          <div className="breeds__collumn">
            <p className="breeds__info">
              <span className="breeds__info--title">Origin:</span> {breed?.origin}
            </p>
            <p className="breeds__info">
              <span className="breeds__info--title">Weight:</span> {breed?.weight?.metric} kg
            </p>
            <p className="breeds__info">
              <span className="breeds__info--title">Life span:</span> {breed?.life_span}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
