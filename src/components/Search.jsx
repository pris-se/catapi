import React from "react";
import { useSearchBreedsQuery } from "../store/petApi";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { useSelector } from "react-redux";

export default function Search({ handleInfo }) {
  const search = useSelector((state) => state.state.q);

  const { data, isLoading, isError } = useSearchBreedsQuery(search);

  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  if (data?.length === 0) {
    return (
      <p className="search-result">
        It is no images for: <span>{search}</span>
      </p>
    );
  }

  const image = data?.map((breed) => (
    <div key={breed.id}>
      <img src={breed?.url} alt={breed?.name} key={breed?.id} />
      <button
        className="breed-name"
        key={breed?.image?.id}
        onClick={() => {
          handleInfo(breed?.id);
        }}
      >
        {breed.name}
      </button>
    </div>
  ));

  return (
    <>
      <p className="search-result">
        Search results for: <span>{search}</span>
      </p>
      <div className="gallery">{image}</div>
    </>
  );
}
