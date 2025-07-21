import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectPokemonById } from "../RTK/selector"

export default function Detail() {
  const { pokemonId } = useParams()
  const pokemon = useSelector(selectPokemonById(Number(pokemonId)))
  console.log(pokemon)

  return (
  <div className="flex flex-col justify-center items-center border border-gray p-[30px] rounded-[10px]">
    <div className="text-[30px]">{pokemon.name}</div>
    <div className="whitespace-pre-wrap text-center">{pokemon.description}</div>
    <img className="w-[200px]"src={pokemon.front} />
  </div>)
}