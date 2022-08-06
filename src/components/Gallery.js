import React from "react";
import Breeds from "./Breeds";
import Search from "./Search";

const Gallery = ({ data, status, breeds, searchData, options, handleInfo }) => {
  const image = data.map((img, idx) => (
    <div key={img.id}>
      <img src={img.url} alt="Cat" key={img.id} />
      <button className="fav-btn" key={idx}>
        <img src="./img/favourite.svg" alt="favourite" />
      </button>
    </div>
  ));

  return (
    <>
      {status === "SEARCH" && breeds && searchData.searched && <Search handleInfo={handleInfo} breeds={breeds} searchData={searchData} />}
      {status === "BREEDS" && breeds && <Breeds breeds={breeds} options={options} handleInfo={handleInfo} />}
      {status === "GALLERY" && <div className="gallery">{image}</div>}
    </>
  );
};

export default Gallery;
