import { useDispatch, useSelector } from 'react-redux'
import { favoriteSlice } from '../RTK/slice'

//일치하는 Id가 있는지 some을 통해 불리언값을 리턴받는다(하트라면 true, 하트가 아니면 false)
//stopPropagation으로 클릭이벤트가 뒤에까지 전달안되게 막아줌
export default function FavoriteButton({pokemonId}) {
  const isFavorite = useSelector(state => state.favorite.some((item) => item === pokemonId))
  const dispatch = useDispatch()

  //찜누르기가 되있는지 안되있는지 확인하는 dispatch
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation()
        dispatch(isFavorite ? favoriteSlice.actions.removeFromFavorite({pokemonId}) :
        favoriteSlice.actions.addToFavorite({pokemonId})) // slice.jsx에서 action.payload.pokemonId로 콕찍어줬기 때문에 객체로 넣어주기위해 {}에 담기. 
      }} 
      className={isFavorite ? "text-[red]" : " "}>
      {isFavorite ? '`♥´'  : '`♡´'}
    </button>
  )
}