import React from "react";
import { useDeleteVoteMutation, useGetVotesQuery } from "../store/petApi";
import { Loader } from "./Loader";
import { Error } from "./Error";

export const History = () => {
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
    return <p className="no-item">It is no votes yet</p>;
  }

  if (isDeleting) {
    <p>Deleting...</p>;
  }

  return data?.map((v) => (
    <div className="votting__row" key={v.id} onClick={() => handlerDeleteVotte(v.id)}>
      <div className="votting__time">
        {new Date(v.created_at).toLocaleTimeString().slice(0, -3)}
      </div>
      <p className="votting__info">
        Image ID: <span>{v.image_id}</span> was added to {v.value === 1 ? "Likes" : "Dislikes"}
      </p>
      {v.value === 1 ? (
        <img className="value" src="./img/like.svg" alt="like" />
      ) : (
        <img className="value" src="./img/dislike.svg" alt="dislike" />
      )}
    </div>
  ));
};
