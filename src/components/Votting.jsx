import React from "react";
import { useAddFavouritesMutation, useGetImageQuery, useMakeVoteMutation } from "../store/petApi";
import { History } from "./History";
import { Error } from "./Error";

export default function Votting() {
  const { data, isFetching, isError, refetch } = useGetImageQuery({ limit: 1, breed_ids: "" });
  const [makeVote] = useMakeVoteMutation();
  const [addToFavourites] = useAddFavouritesMutation();

  const handleVote = (e) => {
    const body = JSON.stringify({
      image_id: data[0]?.id,
      value: e.currentTarget.value,
    });
    makeVote(body);
    refetch();
  };

  const handleAddFavourites = () => {
    const body = JSON.stringify({
      image_id: data[0]?.id,
    });
    addToFavourites(body);
    refetch();
  };

  return (
    <div className="votting">
      {!isError && (
        <div className="votting__image">
          <img
            src={!isFetching ? data[0]?.url : "./img/upload-bg.png"}
            alt={!isFetching ? data[0]?.id : "loading"}
          />
          <div className="votting__buttons">
            <button
              className="votting__button votting__button--like"
              value="1"
              onClick={(e) => handleVote(e)}
            >
              <img src="./img/like.svg" alt="like" />
            </button>
            <button className="votting__button votting__button--fav" onClick={handleAddFavourites}>
              <img src="./img/favourite.svg" alt="favourite" />
            </button>
            <button
              className="votting__button votting__button--dislike"
              value="0"
              onClick={(e) => handleVote(e)}
            >
              <img src="./img/dislike.svg" alt="dislike" />
            </button>
          </div>
        </div>
      )}
      {isError && <Error />}
      <div className="votting__history">
        <History />
      </div>
    </div>
  );
}
