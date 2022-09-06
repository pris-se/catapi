import React from "react";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { useDeleteFavouritesMutation, useGetFavouritesQuery } from "../store/petApi";

export default function Favourite() {
  const { data, isLoading, isError, isSuccess } = useGetFavouritesQuery();
  const [deleteFavourite, { isLoading: isDeleting }] = useDeleteFavouritesMutation();

  const handlerDeleteFavourite = (id) => {
    deleteFavourite(id);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  if (data?.length === 0) {
    return <div className="no-item">No item found</div>;
  }

  const images = data?.map((l, idx) => (
    <div key={l?.id}>
      <img src={l?.image?.url} alt={l?.id} />
      <button
        className="fav-btn"
        key={idx}
        onClick={() => {
          handlerDeleteFavourite(l.id);
        }}
      >
        {isDeleting && <img className="small-loader" src="./img/loader.png" alt="loading" />}
        {!isDeleting && <img src="./img/favourite-active.svg" alt="favourite" />}
      </button>
    </div>
  ));

  return <div className="gallery">{images}</div>;
}
