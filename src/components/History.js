import React from "react";

export default function History({ votes }) {
  votes.reverse();

  const history = votes.map((v) => (
    <div className="votting__row" key={v.id}>
      <div className="votting__time">{new Date(v.created_at).toLocaleTimeString().slice(0, -3)}</div>
      <p className="votting__info">
        Image ID: <span>{v.image_id}</span> was added to {v.value === 1 ? "Likes" : "Dislikes"}
      </p>
      <img className="value" src="./img/like.svg" alt="like" />
    </div>
  ));
  return <div className="votting__history">{history}</div>;
}
