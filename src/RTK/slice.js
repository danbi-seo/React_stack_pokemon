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

//비동기적으로 관리할 필요 없기 때문에 slice에서 작업
//rtk에는 복사해서 새로만든것 같이 업데이트해주기 때문에 리턴하지않고 상태를 변화시키기만 해도 반영해줌
export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: [],
  reducers: {
    addToFavorite(state, action) { state.push(action.payload.pokemonId) },
    removeFromFavorite(state, action) {
      const index = state.indexOf(action.payload.pokemonId) //splice를 사용하기위해서는 index번호가 필요하기 때문에 먼저 확인후 변수에 담기(제거할 요소가 없다면 -1을 리턴)
      if(index !== -1) state.splice(index, 1) //만약 일치하는 index가 있다면 index 번호에서 1개(인덱스자체)만 제거하기
    }
  }
})

