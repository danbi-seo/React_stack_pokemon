import { configureStore } from "@reduxjs/toolkit";
import { favoriteSlice, pokemonSlice } from "./slice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
    favorite: favoriteSlice.reducer
  }
})


