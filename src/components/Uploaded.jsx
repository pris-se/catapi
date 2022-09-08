import React from "react";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { useDeleteImageMutation, useGetUploadsQuery } from "../store/petApi";

export const Uploaded = () => {
  const [deleteImage, { isLoading: isDeleting }] = useDeleteImageMutation();
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

  const images = data?.map((l, idx) => (
    <div key={l?.id}>
      <img
        src={"./img/upload-bg.svg"}
        alt={l?.id}
        key={l?.id}
        onLoad={(e) => (e.target.src = l?.url)}
      />
      <button
        className="fav-btn"
        key={idx}
        onClick={() => {
          handlerDeleteImage(l?.id);
        }}
      >
        {isDeleting && <img className="small-loader" src="./img/loader.png" alt="loading" />}
        {!isDeleting && <img src="./img/close.svg" alt="delete" />}
      </button>
    </div>
  ));

  return <div className="gallery">{images}</div>;
};
