import React from "react";
import { useAddFavouritesMutation, useGetImageQuery } from "../store/petApi";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { useSelector } from "react-redux";

const Gallery = () => {
  const galleryParams = useSelector((state) => state.state.galleryFilter);
  const { data, isFetching: isLoading, isError } = useGetImageQuery(galleryParams);
  const [addToFavourites, { isSuccess, originalArgs }] = useAddFavouritesMutation();

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

  if (data?.length === 0) {
    return <p className="search-result">No item found</p>;
  }

  const image = data?.map((img, idx) => (
    <div key={img.id}>
      <img src={img.url} alt={img.id} key={img.id} />
      <button
        className="fav-btn"
        key={idx}
        onClick={() => {
          handleAddFavourites(img.id);
        }}
      >
        <img
          src={
            isSuccess && JSON.parse(originalArgs).image_id === img.id
              ? "./img/favourite-active.svg"
              : "./img/favourite.svg"
          }
          alt="favourite"
        />
      </button>
    </div>
  ));

  return <div className="gallery">{image}</div>;
};

export default Gallery;
