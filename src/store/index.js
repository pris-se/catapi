const API_KEY = "e44e3f87-e509-468f-b09c-b7394ff112fe";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", API_KEY);

async function fetchUrl(url) {
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const res = await fetch(url, requestOptions);
  return res.json();
}

export async function fetchData(par) {
  const params = {
    limit: 5,
    size: "thumb",
  };
  const searchUrl = "https://api.thecatapi.com/v1/images/search?";
  const url = searchUrl + new URLSearchParams(par ? { ...params, ...par } : params);
  return await fetchUrl(url);
}

export async function fetchAllBreeds() {
  const breedsUrl = "https://api.thecatapi.com/v1/breeds?";
  return await fetchUrl(breedsUrl);
}

export async function fetchBreedsById() {
  const params = {
    limit: 10,
    size: "thumb",
  };
  const breedsUrl = `https://api.thecatapi.com/v1/breeds?` + new URLSearchParams(params);
  return await fetchUrl(breedsUrl);
}

export async function fetchBreedsByName(breedName) {
  const search = "https://api.thecatapi.com/v1/breeds/search?";
  const url = search + new URLSearchParams({ q: breedName });
  return await fetchUrl(url);
}

export async function fetchOne() {
  const url = "https://api.thecatapi.com/v1/images/search";
  return await fetchUrl(url);
}

async function fetchPostUrl(url, id, value) {
  const raw = JSON.stringify({
    image_id: id,
    value: value,
  });
  console.log(raw);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  const res = await fetch(url, requestOptions);
  return res.json();
}

export async function fetchVotes(id, value) {
  const url = "https://api.thecatapi.com/v1/votes?";
  return await fetchPostUrl(url, id, value);
}

export async function fetchHistoryVotes() {
  const url = "https://api.thecatapi.com/v1/votes?";
  return await fetchUrl(url);
}

export async function fetchImageById(id) {
  const searchUrl = `https://api.thecatapi.com/v1/images/search?${id}`;
  return await fetchUrl(searchUrl);
}
