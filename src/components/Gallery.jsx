import React from "react";
import { useAddFavouritesMutation, useGetImageQuery } from "../store/petApi";
import { Loader } from "./Loader";
import { Error } from "./Error";

const Gallery = () => {
  const { data, isLoading, isError } = useGetImageQuery({ limit: 20, id: "" });
  const [addToFavourites] = useAddFavouritesMutation();
  const handleAddFavourites = (id) => {
    const body = JSON.stringify({
      image_id: id,
    });
    addToFavourites(body);
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }
  const image = data?.map((img, idx) => (
    <div key={img.id}>
      <img src={img.url ? img.url : "./img/upload-bg.png"} alt={img.id} key={img.id} />
      <button
        className="fav-btn"
        key={idx}
        onClick={() => {
          handleAddFavourites(img.id);
        }}
      >
        <img src="./img/favourite.svg" alt="favourite" />
      </button>
    </div>
  ));

  return <div className="gallery">{image}</div>;
};

export default Gallery;
