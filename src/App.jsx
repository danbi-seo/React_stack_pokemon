import { useEffect } from 'react'
import './App.scss'
import { useDispatch, useSelector } from 'react-redux' 
import { fetchMultiplePokemonById } from './RTK/thunk'
import { Link, Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { lazy,Suspense  } from 'react'

const Main = lazy(() => import('./pages/Main'))
const Detail = lazy(() => import('./pages/Detail'))
const Search = lazy(() => import('./pages/Search'))
const Favorite = lazy(() => import('./pages/Favorite'))



function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMultiplePokemonById(151))
  }, [])

  return (
    <>
      <h1 className='text-[50px] text-center my-[10px]'>포켓몬 도감</h1>
      <nav className='flex gap-[10px] justify-center'>
        <Link to={'/'}>메인</Link>
        <Link to={'/favorite'}>나의포켓볼</Link>
        <div>
          <input onChange={(e) => navigate(`/search?pokemon=${e.target.value}`)} className='border-b border-[darkgray] px-2'/>
          <span>🔍</span>
        </div>
      </nav>
      <main className='flex flex-wrap justify-center gap-[20px] pt-[30px]'>
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route path={'/'} element={ <Main /> }/>
            <Route path={'/detail/:pokemonId'} element={ <Detail /> }/>
            <Route path={'/search'} element={ <Search /> }/>
            <Route path={'/favorite'} element={ <Favorite /> }/>
          </Routes>
        </Suspense>
      </main>
    </>
  )
}

export default App
