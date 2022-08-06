import React from "react";

export default function Search({ breeds, searchData, handleInfo }) {
  const searchedBreeds = breeds.filter((b) => searchData.searched.includes(b.id));

  const searched = searchedBreeds.map((breed) => (
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
      <p className="search-result">
        Search results for: <span>{searchData.req}</span>
      </p>

      {searched && <div className="gallery">{searched}</div>}
    </>
  );
}
