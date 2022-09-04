import React from "react";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { useDeleteFavouritesMutation, useGetFavouritesQuery } from "../store/petApi";

export default function Favourite() {
  const { data, isLoading, isError } = useGetFavouritesQuery();
  const [deleteFavourite, { isLoading: isDeleting }] = useDeleteFavouritesMutation();

  const handlerDeleteVotte = (id) => {
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

  const images = data?.map((l) => (
    <div key={l?.id} onClick={() => handlerDeleteVotte(l?.id)}>
      <img src={l?.image?.url} alt={l?.id} />
    </div>
  ));

  return <div className="gallery">{images}</div>;
}
