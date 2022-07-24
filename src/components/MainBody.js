import React, { useEffect, useState } from "react";
import { fetchBreeds, fetchData, fetchBreedsByName, fetchOne } from "../store";
import Filter from "./Filter";
import Gallery from "./Gallery";
import MainHeader from "./MainHeader";
import MainNavbar from "./MainNavbar";
import Votting from "./Votting";
const MainBody = ({ status, setStatus }) => {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [breeds, setBreeds] = useState([]);
  let [searchFor, setSearchFor] = useState({});

  const getData = async (par) => {
    setLoading(true);
    let data = await fetchData(par);
    setData(data);
    let breeds = await fetchBreeds();
    setBreeds(breeds);
    setLoading(false);
  };

  const searchByName = async (breedName) => {
    const data = await fetchBreedsByName(breedName);
    const breedIDs = data.map((d) => d.id).toString();
    getData({ breed_ids: breedIDs });
    setSearchFor({ req: breedName, id: data[0].id });
  };

  const getOne = async () => {
    setLoading(true);
    let data = await fetchOne();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (status === "VOTTING") {
      getOne();
      return;
    }
    if (status === "SEARCH") {
      return;
    }
    getData();
  }, [status]);

  return (
    <>
      {!!status && <MainHeader setStatus={setStatus} breeds={breeds} searchByName={(breedName) => searchByName(breedName)} />}
      <div className="main__body">
        <MainNavbar status={status} breeds={breeds} getData={(par) => getData(par)} setStatus={setStatus} />
        {status === "GALLERY" && <Filter breeds={breeds} getData={(par) => getData(par)} />}
        {loading && (
          <div className="loader">
            <img src="./img/loader.png" alt="loading" />
          </div>
        )}
        {(status === "GALLERY" || status === "SEARCH" || status === "BREEDS") && !loading && data && (
          <Gallery searchFor={searchFor} data={data} status={status} breeds={breeds} />
        )}

        {/* {!loading && status === "GALLERY" && data && <Gallery data={data} />}
        {!loading && status === "SEARCH" && data && <Gallery data={data} />}
        {(!loading && status === "BREEDS" && data && <Gallery data={data} />) || (false && <BreedsInfo />)} */}
        {!loading && status === "VOTTING" && data && <Votting data={data} />}
      </div>
    </>
  );
};

export default MainBody;
