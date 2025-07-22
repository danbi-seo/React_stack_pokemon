import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectPokemonById } from "../RTK/selector"
import FavoriteButton from "../component/FavoriteButton"
import FlipCard from "../component/FlipCard"

export default function Detail() {
  const { pokemonId } = useParams()
  const pokemon = useSelector(selectPokemonById(Number(pokemonId)))
  console.log(pokemon)

  return (
  <div className="flex flex-col justify-center items-center border border-gray p-[30px] rounded-[10px]">
    <div className="text-[30px]">
      {pokemon.name}
      <FavoriteButton pokemonId={Number(pokemonId)}/>
    </div>
    <div className="whitespace-pre-wrap text-center">{pokemon.description}</div>
    <FlipCard front={pokemon.front} back={pokemon.back} />
  </div>)
}