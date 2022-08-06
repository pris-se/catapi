import React, { useEffect, useState } from "react";
import { fetchHistoryVotes, fetchVotes } from "../store";
import History from "./History";

export default function Votting({ imgToVote, getOne }) {
  let [votes, setVotes] = useState();
  const getVotes = async (id, value) => {
    let data = await fetchVotes(id, value);
    console.log(data);
  };

  const handleVote = (value) => {
    getVotes(imgToVote.id, value);
    getHistory();
  };

  const getHistory = async () => {
    const data = await fetchHistoryVotes();
    console.log(data);
    setVotes(data);
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="votting">
      <div className="votting__image">
        <img src={imgToVote.url} alt={imgToVote.id} />
        <div className="votting__buttons">
          <button className="votting__button votting__button--like" value="1" onClick={(e) => handleVote(e.currentTarget.value)}>
            <img src="./img/like-white.svg" alt="like" />
          </button>
          <button className="votting__button votting__button--fav" value="0" onClick={(e) => handleVote(e.currentTarget.value)}>
            <img src="./img/favourite-white.svg" alt="favourite" />
          </button>
          <button className="votting__button votting__button--dislike" value="0" onClick={(e) => handleVote(e.currentTarget.value)}>
            <img src="./img/dislike-white.svg" alt="dislike" />
          </button>
        </div>
      </div>
      {votes && <History votes={votes} />}
    </div>
  );
}
