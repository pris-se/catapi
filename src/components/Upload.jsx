import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUploadImageMutation } from "../store/petApi";
import { Loader } from "./Loader";
import { API_URL, DOG_API_URL } from "../store/petApi";

export const Upload = () => {
  const [uploadImage, { data, isError, isLoading, isSuccess, reset }] = useUploadImageMutation();
  const input = useRef();
  let navigate = useNavigate();
  const isNightTheme = useSelector((state) => state.state.isNightTheme);

  const onLoadHandler = (e) => {
    const path = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", path, "file");
    uploadImage(formdata);
  };

  const inputResetHandler = () => {
    input.current.value = null;
    reset();
  };

  return (
    <div className="main upload">
      <button className="close-btn" onClick={() => navigate(-1)}>
        <img src="./img/close.svg" alt="close" />
      </button>
      <div className="upload__container">
        <header className="upload__heading">
          <h1 className="upload__title">
            Upload a .jpg or .png {API_URL === DOG_API_URL ? "Dog" : "Cat"} Image
          </h1>
          <h2 className="upload__subtitle">
            Any uploads must comply with the <span>upload guidelines</span> or face deletion.
          </h2>
        </header>
        <div className="upload__file">
          <label className={!isError ? "upload__input" : "upload__input error"} htmlFor="file">
            {!isLoading && !data && (
              <img
                className="upload__upload-bg"
                src={isNightTheme ? "./img/upload-bg-night.svg" : "./img/upload-bg.svg"}
                alt="upload"
              />
            )}
            {!isLoading && !data && (
              <p>
                <span>Drag here</span> your file or <span>Click here</span> to upload
              </p>
            )}
            {isLoading && <Loader />}
            {!isLoading && data && <img src={data?.url} alt={data?.name} />}
          </label>
          <input
            id="file"
            type="file"
            ref={input}
            accept=".jpg,.png"
            onDrop={(e) => onLoadHandler(e)}
            onChange={(e) => onLoadHandler(e)}
          />
        </div>
        <div className="upload__description">
          {data && !isLoading && <p className="upload__info">{data?.url}</p>}
          {!data && !isError && <p className="upload__info">No file selected</p>}
          {isSuccess && !isLoading && !isError && (
            <button className="upload__button" onClick={inputResetHandler}>
              UPLOAD NEW PHOTO
            </button>
          )}
          {isSuccess && (
            <p className="upload__message">
              <img src="./img/success.svg" alt="success" />
              Thanks for the Upload - {API_URL === DOG_API_URL ? "dog" : "cat"} found!
            </p>
          )}
          {isError && (
            <p className="upload__message">
              <img src="./img/error.svg" alt="error" />
              No {API_URL === DOG_API_URL ? "dog" : "cat"} found - try a different one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
