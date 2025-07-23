import { createAsyncThunk } from '@reduxjs/toolkit' 

export const fetchMultiplePokemonById = createAsyncThunk(
  'pokemon/fetchMultiplePokemonById',
  async (maxPokemonId, thunkAPI) => {
    const typeNamesMap = {};

    // [1] 타입 전체 fetch, 네트워크 오류 대비 try/catch
    try {
      const allTypesResponse = await fetch('https://pokeapi.co/api/v2/type/');
      if (!allTypesResponse.ok) throw new Error('타입 목록 불러오기 실패');
      const allTypesJson = await allTypesResponse.json();

      // [2] 개별 타입 fetch try/catch, 실패 시 영어 이름 fallback
      await Promise.all(
        allTypesJson.results.map(async (typeEntry) => {
          try {
            const typeDetailResponse = await fetch(typeEntry.url);
            if (!typeDetailResponse.ok) throw new Error();
            const typeDetailJson = await typeDetailResponse.json();
            const koreanTypeName = typeDetailJson.names.find(nameEntry => nameEntry.language.name === 'ko')?.name;
            typeNamesMap[typeEntry.name] = koreanTypeName || typeEntry.name;
          } catch {
            typeNamesMap[typeEntry.name] = typeEntry.name; // 영어 fallback
          }
        })
      );
    } catch (err) {
      // 타입 전체 fetch 실패시, 모든 타입을 영어로 fallback
      // → 타입명 표기가 영어로만 나올 수 있음
    }

    const numberArray = Array.from({ length: maxPokemonId }, (_, i) => i + 1);

    // [3] 개별 포켓몬 fetch try/catch, 실패시 fallback 카드
    const fetchAPI = async (pokemonId) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
        if (!response.ok) throw new Error();
        const data = await response.json();

        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
        if (!pokemonResponse.ok) throw new Error();
        const pokemonSubData = await pokemonResponse.json();

        const koreanTypes = pokemonSubData.types.map(typeEntry => ({
          slot: typeEntry.slot,
          type: {
            name: typeNamesMap[typeEntry.type.name] || typeEntry.type.name,
            url: typeEntry.type.url
          }
        }));

        const pokemonData = {
          id: pokemonId,
          name: data.names.find(el => el.language.name === 'ko')?.name ?? data.name,
          description: data.flavor_text_entries.find(el => el.language.name === 'ko')?.flavor_text ?? '',
          front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
          back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`,
          types: koreanTypes
        };
        return pokemonData;
      } catch {
        // [4] fallback 카드 (에러 안내)
        return {
          id: pokemonId,
          name: '에러',
          description: '이 포켓몬 정보를 불러올 수 없습니다.',
          front: '',
          back: '',
          types: [],
          error: true
        };
      }
    };

    // [5] 전체 fetch에 try/catch: 진짜 전체 실패(네트워크 완전 다운 등) 처리
    try {
      const allPokemons = await Promise.all(numberArray.map(el => fetchAPI(el)));
      return allPokemons;
    } catch (err) {
      return thunkAPI.rejectWithValue('전체 포켓몬 데이터를 불러오지 못했습니다.');
    }
  }
);









// export const fetchMultiplePokemonById = createAsyncThunk(
//   'pokemon/fetchMultiplePokemonById',
//   async (maxPokemonId) => {
//     const typeNamesMap = {};

//     const allTypesResponse = await fetch('https://pokeapi.co/api/v2/type/');
//     const allTypesJson = await allTypesResponse.json(); 

//     await Promise.all(
//       allTypesJson.results.map(async (typeEntry) => {
//         const typeDetailResponse = await fetch(typeEntry.url);
//         const typeDetailJson = await typeDetailResponse.json(); // JSON으로 파싱

//         const koreanTypeName = typeDetailJson.names.find(nameEntry => nameEntry.language.name === 'ko')?.name;
//         if (koreanTypeName) {
//           typeNamesMap[typeEntry.name] = koreanTypeName;
//         }
//       })
//     );

//     const numberArray = Array.from({length: maxPokemonId}, (_, i) =>  i + 1 )//151개의 배열을 만들기 / 배열고차함수의 두번째 인자는 항상 index
//     const fetchAPI = async (pokemonId) => {
//       const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`) //api 요청후 await하고 변수에 담기
//       const data = await response.json() //JSON -> JS

//       const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
//       const pokemonSubData = await pokemonResponse.json();

//       const koreanTypes = pokemonSubData.types.map(typeEntry => ({
//         slot: typeEntry.slot,
//         type: {
//           name: typeNamesMap[typeEntry.type.name] || typeEntry.type.name,
//           url: typeEntry.type.url
//         }
//       }))

//       const pokemonData = {
//       id: pokemonId,
//       name: data.names.find(el => el.language.name === 'ko').name,
//       description: data.flavor_text_entries.find(el => el.language.name === 'ko').flavor_text,
//       front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
//       back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`,
//       types: koreanTypes
//       }
//       return pokemonData
//     } 
//     return await Promise.all(numberArray.map((el) => fetchAPI(el)))
//   }
// )