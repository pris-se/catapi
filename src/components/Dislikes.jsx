import React from "react";
import { useGetVotesQuery, useDeleteVoteMutation } from "../store/petApi";
import { Loader } from "./Loader";
import { Error } from "./Error";

export default function Dislikes() {
  const { data, isLoading, isError } = useGetVotesQuery();
  const [deleteVote, { isLoading: isDeleting }] = useDeleteVoteMutation();
  const handlerDeleteVotte = (id) => {
    deleteVote(id);
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

  const images = data
    ?.filter((l) => l.value === 0)
    ?.map((l, idx) => (
      <div key={l?.id}>
        <img
          src={"./img/upload-bg.svg"}
          alt={l?.id}
          key={l?.id}
          onLoad={(e) => (e.target.src = l?.image?.url)}
        />
        <button
          className="fav-btn"
          key={idx}
          onClick={() => {
            handlerDeleteVotte(l?.id);
          }}
        >
          {isDeleting && <img className="small-loader" src="./img/loader.png" alt="loading" />}
          {!isDeleting && <img src="./img/close.svg" alt="delete" />}
        </button>
      </div>
    ));

  return <div className="gallery">{images}</div>;
}
