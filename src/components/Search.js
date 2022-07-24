import React from "react";

export default function Search({ breeds, data, searchFor }) {
  const searched = data.map((img, idx) => (
    <div key={img.id}>
      <img src={img.url} alt="Cat" key={img.id} />
      <button className="breed-name" key={idx}>
        {breeds.filter((e) => e.id === searchFor.id)[0].name}
      </button>
    </div>
  ));

  return (
    <>
      <p className="search-result">
        Search results for: <span>{searchFor.req}</span>
      </p>
      <div className="gallery">{searched}</div>
    </>
  );
}
