import React from "react";
import { useGetVotesQuery, useDeleteVoteMutation } from "../store/petApi";
import { Loader } from "./Loader";
import { Error } from "./Error";

export default function Dislikes() {
  const { data, isLoading, isError } = useGetVotesQuery();
  const [deleteVote, { isLoading: isDeleting }] = useDeleteVoteMutation();
  const handlerDeleteVotte = (id) => {
    deleteVote(id);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  if (data?.length === 0) {
    return <div className="no-item">No item found</div>;
  }

  const images = data
    ?.filter((l) => l.value === 0)
    ?.map((l) => (
      <div key={l?.id} onClick={() => handlerDeleteVotte(l?.id)}>
        <img src={l?.image?.url} alt={l?.id} />
      </div>
    ));

  return <div className="gallery">{images}</div>;
}
