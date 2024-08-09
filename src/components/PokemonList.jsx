import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PokemonList = () => {
  const [offSet,setOffset] = useState([])

  const [Pokemons, setPokemons] = useState([]);
  useEffect(() => {
    const getPokemonData = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offSet}`
      );
      const pokemonPromises = response.data.results.map((item) =>
        fetch(item.url).then((res) => res.json())
      );
      const PokemonData = await Promise.all(pokemonPromises);
      setPokemons(PokemonData);
    }
    getPokemonData();
  }, [offSet]);
  
  const handlePrevious = ()=>{
    if(offSet !== 0) {
        return setOffset(offSet - 20)
    }
    return
  }

  const handleNext = ()=>{
     setOffset(offSet + 20)
  }

  return (
    <>
    <div className="grid grid-cols-4 gap-3">
      {Pokemons.map((item, index) => (
        <div className="shadow-md py-3 px-5 rounded-lg" key={index}>
          <img src={item.sprites.back_default} width={150} alt="pokemon" />
          <div className="flex justify-between px-4">
            <p className="capitalize tracking-wider font-semibold text-2xl">
              {item.name}
            </p>
            <Link to={`/${item.id}`}>
              <button className="btn border py-1 px-2">see pokemon</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
    <div className="flex space-x-10 my-10 items-center justify-center">
        <button onClick={handlePrevious} className="border py-2 px-10">previous</button>
        <button onClick={handleNext} className="border py-2 px-10">next</button>
      </div>
    </>
  );
};

export default PokemonList;
