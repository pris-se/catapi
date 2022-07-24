import React from "react";

export default function Votting({ data }) {
  return (
    <div className="breeds">
      <div className="breeds__slider">
        <img className="breeds__image" src={data[0].url} alt="cat" />
      </div>
    </div>
  );
}
