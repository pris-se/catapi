import React from "react";
import { useGetImageQuery } from "../store/petApi";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { useSelector } from "react-redux";

export default function Breeds({ handleInfo }) {
  const breedsParams = useSelector((state) => state.state.breedsFilter);
  const { data, isFetching: isLoading, isError } = useGetImageQuery(breedsParams);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }

  if (data?.length === 0) {
    return <p className="search-result">No item found</p>;
  }

  const image = data?.map((breed) => (
    <div key={breed.id}>
      <img src={breed?.url} alt={breed?.breeds[0]?.name} key={breed?.id} />
      <button
        className="breed-name"
        key={breed?.breeds[0]?.id}
        onClick={() => {
          handleInfo(breed?.breeds[0]?.id);
        }}
      >
        {breed?.breeds[0]?.name}
      </button>
    </div>
  ));

  return (
    <>
      <div className="gallery">{image}</div>
    </>
  );
}
