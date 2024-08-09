import { Route, Routes } from 'react-router'
import './App.css'
import PokemonList from './components/PokemonList'
import Pokemon from './components/Pokemon'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<PokemonList />}></Route>
        <Route path='/:id' element={<Pokemon />}></Route>
        <Route></Route>
      </Routes>
    </>
  )
}

export default App
