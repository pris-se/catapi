import React from "react";
import { useState } from "react";
import { useGetImageQuery } from "../store/petApi";
import { Loader } from "./Loader";
import { Error } from "./Error";

export default function BreedsInfo() {
  const [slide, setSlide] = useState(0);

  const breedId = JSON.parse(window.localStorage.getItem("breedInfo"));

  const { data, isLoading, isError } = useGetImageQuery({
    limit: 10,
    breed_ids: breedId,
    has_breeds: 1,
  });

  const nextHandler = (e) => {
    const max = data?.length - 1;
    if (slide === max) {
      return;
    }
    setSlide(slide + 1);
  };
  const prevHandler = () => {
    if (slide === 0) {
      return;
    }
    setSlide(slide - 1);
  };

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

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }

  if (data?.length === 0) {
    return <p className="no-item">Chose breed</p>;
  }

  return (
    <div className="breeds">
      <div className="breeds__slider">
        {!isLoading && images[slide]}
        {isLoading && <img className="breeds__image" src="./img/upload-bg.png" alt="loading" />}
        {images?.length === 0 && (
          <img className="breeds__image" src="./img/upload-bg.png" alt="loading" />
        )}
        <div className="breeds__buttons">{buttons}</div>
        <button className="breeds__prev-btn" onClick={() => prevHandler()}>
          <img src="./img/prev-btn.svg" alt="prev" />
        </button>
        <button className="breeds__next-btn" onClick={(e) => nextHandler(e)}>
          <img src="./img/next-btn.svg" alt="next" />
        </button>
      </div>
      <div className="breeds__description">
        <h1 className="breeds__title">{data[0]?.breeds[0]?.name}</h1>
        <h2 className="breeds__subtitle">
          {data[0]?.breeds[0]?.bred_for || data[0]?.breeds[0]?.alt_names}
        </h2>
        <div className="breeds__row">
          <div className="breeds__collumn">
            <p className="breeds__info">
              <span className="breeds__info--title">Temperament:</span> <br />
              {data[0]?.breeds[0]?.temperament}
            </p>
          </div>
          <div className="breeds__collumn">
            <p className="breeds__info">
              <span className="breeds__info--title">Origin:</span>{" "}
              {data[0]?.breeds[0]?.origin || data[0]?.breeds[0]?.country_code}
            </p>
            <p className="breeds__info">
              <span className="breeds__info--title">Weight:</span> {data[0]?.breeds[0]?.metric} kg
            </p>
            <p className="breeds__info">
              <span className="breeds__info--title">Life span:</span>
              {data[0]?.breeds[0]?.life_span}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
