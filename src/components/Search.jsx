import React from "react";
import { useSearchBreedsQuery } from "../store/petApi";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { useSelector } from "react-redux";

export default function Search({ handleInfo }) {
  const search = useSelector((state) => state.state.q);

  const { data, isLoading, isError } = useSearchBreedsQuery(search);
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

  const results = data?.map((breed) => (
    <div
      className="search__row"
      key={breed.id}
      onClick={() => {
        handleInfo(breed?.id);
      }}
    >
      <span>{breed.name}</span> : {breed.temperament}
    </div>
  ));

  return (
    <>
      <p className="search-result">
        Search results for: <span>{search}</span>
      </p>
      <div className="search">{results}</div>
    </>
  );
}
