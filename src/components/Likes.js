import React, { useEffect } from "react";

export default function Likes({ likes }) {
  const images = likes.map((l) => (
    <div key={l.id}>
      <img src={l.url} alt={l.id} />
    </div>
  ));
  useEffect(() => {
    console.log(likes.length);
  }, []);

  return <>{likes.length === 0 ? <div className="no-item">No item found</div> : <div className="gallery">{images}</div>}</>;
}
