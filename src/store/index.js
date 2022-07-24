async function fetchUrl(url) {
  const API_KEY = "e44e3f87-e509-468f-b09c-b7394ff112fe";
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
    },
  });
  return res.json();
}

export async function fetchData(par) {
  const params = {
    limit: 10,
    size: "thumb",
    // api_key: "e44e3f87-e509-468f-b09c-b7394ff112fe",
  };
  const searchUrl = "https://api.thecatapi.com/v1/images/search?";
  const url = searchUrl + new URLSearchParams(par ? { ...params, ...par } : params);
  return await fetchUrl(url);
}

export async function fetchBreeds() {
  const breedsUrl = "https://api.thecatapi.com/v1/breeds?";
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
