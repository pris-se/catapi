import React from "react";
import { useGetBreedQuery } from "../store/petApi";
import { Loader } from "./Loader";
import { Error } from "./Error";

export default function Breeds({ handleInfo }) {
  const { data, isLoading, isError } = useGetBreedQuery({ id: "?", limit: 5 });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }

  const image = data.map((breed) => (
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
