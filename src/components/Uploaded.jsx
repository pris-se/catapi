import React from "react";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { useDeleteImageMutation, useGetUploadsQuery } from "../store/petApi";

export const Uploaded = () => {
  const [deleteImage] = useDeleteImageMutation();
  const { data, isError, isLoading } = useGetUploadsQuery();

  const handlerDeleteImage = (id) => {
    deleteImage(id);
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
    <div key={l?.id} onClick={() => handlerDeleteImage(l?.id)}>
      <img src={l?.url} alt={l?.id} />
    </div>
  ));

  return <div className="gallery">{images}</div>;
};
