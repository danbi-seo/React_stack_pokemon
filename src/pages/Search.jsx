import { getRegExp } from "korean-regexp"
import { useSelector } from 'react-redux'
import { useSearchParams } from "react-router-dom"
import { selectPokemonByRegExp } from "../RTK/selector"
import { Card } from "../component/Card"

export default function Search() {
  const [searchParams] = useSearchParams()
  const param = searchParams.get('pokemon')
  const reg = getRegExp(param) //param과 일치하는 파라미터가 있는지 정규식을 변수에 담음
  const pokemon = useSelector(selectPokemonByRegExp(reg)) //위에 reg를 정규식에 담아주기
  console.log(pokemon)
  return (
  <>
    {pokemon.map(el => <Card key={el.id} pokemon={el} />)}
  </>)
}