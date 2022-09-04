import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CAT_API_URL = "https://api.thecatapi.com/v1/";
export const DOG_API_URL = "https://api.thedogapi.com/v1/";

const CAT_API_KEY = process.env.REACT_APP_CAT_API_KEY;
const DOG_API_KEY = process.env.REACT_APP_DOG_API_KEY;
export const API_URL = window.localStorage.getItem("api-url") || CAT_API_URL;
const API_KEY = API_URL === DOG_API_URL ? DOG_API_KEY : CAT_API_KEY;

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set("x-api-key", API_KEY);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Images", "Votes"],
  endpoints: (build) => ({
    getImage: build.query({
      query: ({ limit, id }) => `images/search?limit=${limit}&breed_ids=${id}`,
    }),
    getBreed: build.query({
      query: ({ id, limit }) => `breeds/${id}&limit=${limit}`,
    }),
    getBreeds: build.query({
      query: (limit) => `breeds?limit=${limit}`,
    }),
    searchBreeds: build.query({
      query: (q) => `breeds/search?q=${q}`,
    }),
    getVotes: build.query({
      query: () => `/votes?`,
      providesTags: ["Votes"],
    }),
    makeVote: build.mutation({
      query: (body) => ({
        url: `/votes?`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Votes"],
    }),
    deleteVote: build.mutation({
      query: (id) => ({
        url: `/votes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Votes"],
    }),
    getFavourites: build.query({
      query: () => `/favourites?`,
      providesTags: ["Favourites"],
    }),
    addFavourites: build.mutation({
      query: (body) => ({
        url: `/favourites?`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Favourites"],
    }),
    deleteFavourites: build.mutation({
      query: (id) => ({
        url: `/favourites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favourites"],
    }),
  }),
});

export const {
  useGetImageQuery,
  useGetBreedQuery,
  useGetBreedsQuery,
  useSearchBreedsQuery,
  useGetVotesQuery,
  useMakeVoteMutation,
  useDeleteVoteMutation,
  useGetFavouritesQuery,
  useAddFavouritesMutation,
  useDeleteFavouritesMutation,
} = petApi;
