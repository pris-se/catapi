import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUploadImageMutation } from "../store/petApi";
import { Loader } from "./Loader";

export const Upload = () => {
  const [uploadImage, { data, isError, isLoading, isSuccess, reset }] = useUploadImageMutation();
  const input = useRef();
  let navigate = useNavigate();

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
    <div className="main">
      <div className="main__container upload">
        <button className="upload__close" onClick={() => navigate(-1)}>
          <img src="./img/close.svg" alt="close" />
        </button>
        <div className="upload__container">
          <header className="upload__heading">
            <h1 className="upload__title">Upload a .jpg or .png Cat Image</h1>
            <h2 className="upload__subtitle">
              Any uploads must comply with the <span>upload guidelines</span> or face deletion.
            </h2>
          </header>
          <div className="upload__file">
            <label className={!isError ? "upload__input" : "upload__input error"} htmlFor="file">
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
              onDrop={(e) => onLoadHandler(e)}
              onChange={(e) => onLoadHandler(e)}
            />
          </div>
          <div className="upload__description">
            {data && !isLoading && <h2 className="upload__info">{data?.url}</h2>}
            {!data && !isError && <p className="upload__info">No file selected</p>}
            {isSuccess && !isLoading && !isError && (
              <button className="upload__button" onClick={inputResetHandler}>
                UPLOAD PHOTO
              </button>
            )}
            {isSuccess && (
              <p className="upload__message">
                <img src="./img/success.svg" alt="success" />
                Thanks for the Upload - Cat found!
              </p>
            )}
            {isError && (
              <p className="upload__message">
                <img src="./img/error.svg" alt="error" />
                No Cat found - try a different one!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
