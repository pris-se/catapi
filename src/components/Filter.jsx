import React, { useState } from "react";
import { useGetBreedsQuery } from "../store/petApi";

export default function Filter() {
  const { data } = useGetBreedsQuery();

  let [filter, setFilter] = useState({
    breed_ids: "",
    limit: 5,
    order: "Rand",
    mime_types: "",
  });

  const orders = [
    { name: "Random", id: "Rand" },
    { name: "Desc", id: "Desc" },
    { name: "Ask", id: "Ask" },
  ];
  const types = [
    { name: "animated", id: "gif" },
    { name: "static", id: "jpg, png" },
  ];
  const limits = [5, 10, 15, 20];

  const breedOption = data?.map((breed) => (
    <option value={breed.id} key={breed.id}>
      {breed.name}
    </option>
  ));
  const typeOption = types.map((t) => (
    <option value={t.id} key={t.id}>
      {t.name}
    </option>
  ));
  const orderOption = orders.map((o) => (
    <option value={o.id} key={o.id}>
      {o.name}
    </option>
  ));
  const limitOption = limits.map((l, id) => (
    <option value={l} key={id}>
      {l} items per page
    </option>
  ));

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className="filter" onSubmit={(e) => submitHandler(e)}>
      <div className="filter__row">
        <div className="filter__block">
          <h4 className="filter__name">ORDER</h4>
          <select
            className="filter__select"
            value={filter.order}
            onChange={(e) => setFilter({ ...filter, order: e.target.value })}
          >
            {orderOption}
          </select>
        </div>
        <div className="filter__block">
          <h4 className="filter__name">ORDER</h4>
          <select
            className="filter__select"
            value={filter.mime_types}
            onChange={(e) => setFilter({ ...filter, mime_types: e.target.value })}
          >
            <option value="">All</option>
            {typeOption}
          </select>
        </div>
      </div>
      <div className="filter__row">
        <div className="filter__block">
          <h4 className="filter__name">BREED</h4>
          <select
            className="filter__select"
            value={filter.breed_ids}
            onChange={(e) => setFilter({ ...filter, breed_ids: e.target.value })}
          >
            <option value="">None</option>
            {breedOption}
          </select>
        </div>
        <div className="filter__block">
          <h4 className="filter__name">LIMIT</h4>
          <div className="filter__subrow">
            <select
              className="filter__select"
              value={filter.limit}
              onChange={(e) => setFilter({ ...filter, limit: e.target.value })}
            >
              {limitOption}
            </select>
            <button type="submit" className="filter__update">
              <img src="./img/update.svg" alt="update" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
