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
      return headers;
    },
  }),
  tagTypes: ["Images", "Votes"],
  endpoints: (build) => ({
    getImage: build.query({
      query: ({ limit, breed_ids, mime_types, order, has_breeds }) =>
        `images/search?limit=${limit}&breed_ids=${breed_ids}&mime_types=${mime_types}&order=${order}&&has_breeds=${has_breeds}`,
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
        headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
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
    getUploads: build.query({
      query: () => `images/?limit=50&original_filename`,
      providesTags: ["Uploads"],
    }),
    uploadImage: build.mutation({
      query: (body) => ({
        url: `/images/upload`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Uploads"],
    }),
    deleteImage: build.mutation({
      query: (id) => ({
        url: `/images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Uploads"],
    }),
  }),
});

export const {
  useGetImageQuery,
  useGetBreedsQuery,
  useSearchBreedsQuery,
  useGetVotesQuery,
  useMakeVoteMutation,
  useDeleteVoteMutation,
  useGetFavouritesQuery,
  useAddFavouritesMutation,
  useDeleteFavouritesMutation,
  useGetUploadsQuery,
  useUploadImageMutation,
  useDeleteImageMutation,
} = petApi;
