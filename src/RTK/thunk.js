import { createAsyncThunk } from '@reduxjs/toolkit' 

export const fetchMultiplePokemonById = createAsyncThunk(
  'pokemon/fetchMultiplePokemonById',
  async (maxPokemonId) => {
    const typeNamesMap = {};

    const allTypesResponse = await fetch('https://pokeapi.co/api/v2/type/');
    const allTypesJson = await allTypesResponse.json(); 

    await Promise.all(
      allTypesJson.results.map(async (typeEntry) => {
        const typeDetailResponse = await fetch(typeEntry.url);
        const typeDetailJson = await typeDetailResponse.json(); // JSON으로 파싱

        const koreanTypeName = typeDetailJson.names.find(nameEntry => nameEntry.language.name === 'ko')?.name;
        if (koreanTypeName) {
          typeNamesMap[typeEntry.name] = koreanTypeName;
        }
      })
    );

    const numberArray = Array.from({length: maxPokemonId}, (_, i) =>  i + 1 )//151개의 배열을 만들기 / 배열고차함수의 두번째 인자는 항상 index
    const fetchAPI = async (pokemonId) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`) //api 요청후 await하고 변수에 담기
      const data = await response.json() //JSON -> JS

      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
      const pokemonSubData = await pokemonResponse.json();

      const koreanTypes = pokemonSubData.types.map(typeEntry => ({
        slot: typeEntry.slot,
        type: {
          name: typeNamesMap[typeEntry.type.name] || typeEntry.type.name,
          url: typeEntry.type.url
        }
      }))

      const pokemonData = {
      id: pokemonId,
      name: data.names.find(el => el.language.name === 'ko').name,
      description: data.flavor_text_entries.find(el => el.language.name === 'ko').flavor_text,
      front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
      back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`,
      types: koreanTypes
      }
      return pokemonData
    } 
    return await Promise.all(numberArray.map((el) => fetchAPI(el)))
  }
)