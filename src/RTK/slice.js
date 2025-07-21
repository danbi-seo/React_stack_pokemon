import { createSlice } from '@reduxjs/toolkit';
import { fetchMultiplePokemonById } from './thunk';

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {}, //동기적 상태변경 //비동기적 상태변경
  extraReducers: (builder) => {
    builder
      .addCase(fetchMultiplePokemonById.pending, (state) => 
        { //처리중일때 loading을 true로 계속진행
          state.loading = true;
        })
      .addCase(fetchMultiplePokemonById.rejected, (state) => 
        { //처리실패일때 loading을 false로 끝낸다
          state.loading = false;
        })
      .addCase(fetchMultiplePokemonById.fulfilled, (state, action) => 
        { //처리완료일때 loading을 false로 끝내고 promise로 만들어진 배열을 가지고와서 data로 넣어준다 
          state.loading = false;
          state.data = action.payload
        })
  }   
}) 