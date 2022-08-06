import React, { useEffect, useState } from "react";
import { fetchAllBreeds, fetchData, fetchBreedsByName, fetchOne, fetchHistoryVotes, fetchImageById } from "../store";
import BreedsInfo from "./BreedsInfo";
import Filter from "./Filter";
import Gallery from "./Gallery";
import Likes from "./Likes";
import Favourite from "./Favourite";
import Dislikes from "./Dislikes";
import MainHeader from "./MainHeader";
import MainNavbar from "./MainNavbar";
import Votting from "./Votting";
const MainBody = ({ status, setStatus }) => {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [breeds, setBreeds] = useState([]);
  let [searchData, setSearchData] = useState({});
  let [options, setOptions] = useState({
    breed_ids: "",
    limit: 5,
  });
  let [breed, setBreed] = useState("");
  let [imgToVote, setImgToVote] = useState();
  let [likes, setLikes] = useState(null);

  const getData = async (par) => {
    setLoading(true);
    let data = await fetchData(par);
    setData(data);
    setLoading(false);
  };

  const getBreeds = async () => {
    setLoading(true);
    let breeds = await fetchAllBreeds();
    setBreeds(breeds);
    setLoading(false);
  };

  const searchByName = async (searchFor) => {
    const data = await fetchBreedsByName(searchFor);
    const breedIDs = data.map((d) => d.id).toString();
    setSearchData({ req: searchFor, searched: breedIDs });
    setBreed("");
  };

  const getOne = async () => {
    setLoading(true);
    let data = await fetchOne();
    setImgToVote(data[0]);
    setLoading(false);
  };

  const getImages = async () => {
    setLoading(true);
    const images = [];
    const history = await fetchHistoryVotes();
    const imageIds = history.map((h) => h.image_id);
    imageIds.slice(0, 5).forEach(async (i) => {
      const img = await fetchImageById(i);
      images.push({ url: img[0].url, id: img[0].id });
    });
    console.log(images);
    setLikes(images);
    console.log(likes);
    setLoading(false);
  };

  const handleInfo = (breed) => {
    setBreed(breed);
  };

  useEffect(() => {
    getBreeds();
  }, []);

  useEffect(() => {
    if (status === "VOTTING") {
      getOne();
      return;
    }
    if (status === "SEARCH") {
      return;
    }
    if (status === "DISLIKES" || status === "FAVOURITES") {
      return;
    }
    if (status === "LIKES") {
      getImages();
      return;
    }
    getData();
  }, [status]);

  useEffect(() => {
    setBreed("");
  }, [status]);

  return (
    <>
      {!!status && <MainHeader setStatus={setStatus} searchByName={(breedName) => searchByName(breedName)} />}
      <div className="main__body">
        <MainNavbar status={status} options={options} breeds={breeds} setBreed={setBreed} setOptions={setOptions} setStatus={setStatus} />
        {status === "GALLERY" && <Filter breeds={breeds} getData={(par) => getData(par)} />}
        {loading && (
          <div className="loader">
            <img src="./img/loader.png" alt="loading" />
          </div>
        )}
        {(status === "GALLERY" || status === "SEARCH" || status === "BREEDS") && !loading && data && !breed && (
          <Gallery options={options} handleInfo={handleInfo} searchData={searchData} data={data} status={status} breeds={breeds} />
        )}
        {!loading && status === "VOTTING" && imgToVote && !breed && <Votting setLoading={setLoading} getOne={getOne} imgToVote={imgToVote} />}
        {breed && <BreedsInfo breed={breed} />}
        {!loading && status === "LIKES" && !breed && likes && <Likes likes={likes} />}
        {!loading && status === "FAVOURITES" && !breed && <Favourite />}
        {!loading && status === "DISLIKES" && !breed && <Dislikes />}
      </div>
    </>
  );
};

export default MainBody;
