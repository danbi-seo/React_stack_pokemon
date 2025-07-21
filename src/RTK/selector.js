import { createSelector } from '@reduxjs/toolkit';

//미리 전체 포켓몬중에 선택한 포켓몬만 걸러서 가져올 수 있게
export const selectPokemonById = (pokemonId) => createSelector( // 바깥에서 쓸 때 pokemonId라는 값을 받아올 수 있음
  state => state.pokemon.data,  //인자이름은 코드작성과 관련없이 불러온 데이터를 어떻게 받아올지를 정하는 거라 어떤이름이든 상관x
  (pokemon) => pokemon.find(el => el.id === pokemonId)
)

