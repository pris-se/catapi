import React from "react";

export default function Breeds({ breeds, options, handleInfo }) {
  const filteredBreeds = breeds.slice(0, options.limit).filter((b) => {
    if (!options.breed_ids) {
      return true;
    }
    return b.id === options.breed_ids;
  });

  const image = filteredBreeds.map((breed) => (
    <div key={breed.id}>
      <img src={breed?.image?.url} alt={breed.name} key={breed.id} />
      <button
        className="breed-name"
        key={breed?.image?.id}
        onClick={() => {
          handleInfo(breed);
        }}
      >
        {breed.name}
      </button>
    </div>
  ));

  return (
    <>
      <div className="gallery">{image}</div>
    </>
  );
}
