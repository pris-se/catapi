import React from "react";

export default function Breeds({ data, breeds }) {
  const image = data.map((img, idx) => (
    <div key={img.id}>
      <img src={img.url} alt="Cat" key={img.id} />
      <button className="breed-name" key={idx}>
        Breed Name
      </button>
    </div>
  ));

  return <div className="gallery">{image}</div>;
}
