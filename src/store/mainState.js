import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "state",
  initialState: {
    isNightTheme: JSON.parse(window.localStorage.getItem("isNightTheme")) || false,
    q: "",
    breedsFilter: {
      breed_ids: "",
      limit: 5,
      order: "Rand",
      mime_types: "",
      has_breeds: 1,
    },
    galleryFilter: {
      breed_ids: "",
      limit: 5,
      order: "Rand",
      mime_types: "",
      has_breeds: 0,
    },
  },
  reducers: {
    search: (state, action) => {
      state.q = action.payload;
    },
    setGalleryFilter: (state, action) => {
      state.galleryFilter = { ...state.galleryFilter, ...action.payload };
    },
    setBreedsFilter: (state, action) => {
      state.breedsFilter = { ...state.breedsFilter, ...action.payload };
    },
    toggleTheme: (state) => {
      state.isNightTheme = !state.isNightTheme;
    },
  },
  extraReducers: {},
});

export const { search, setGalleryFilter, setBreedsFilter, toggleTheme } = counterSlice.actions;

export default counterSlice.reducer;
