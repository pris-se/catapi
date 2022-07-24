import React from "react";
import {} from "../store";
import Breeds from "./Breeds";
import Search from "./Search";

const Gallery = ({ data, status, breeds, searchFor }) => {
  const image = data.map((img, idx) => (
    <div key={img.id}>
      <img src={img.url} alt="Cat" key={img.id} />
      <button className="fav-btn" key={idx}>
        <img src="./img/favourite.svg" alt="favourite" />
      </button>
    </div>
  ));

  return (
    <>
      {status === "SEARCH" && <Search data={data} breeds={breeds} searchFor={searchFor} />}
      {status === "BREEDS" && <Breeds data={data} breeds={breeds} />}
      {status === "GALLERY" && <div className="gallery">{image}</div>}
    </>
  );
};

export default Gallery;
