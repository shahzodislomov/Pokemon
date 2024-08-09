import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getDataPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };
    getDataPokemon();
  }, [id]);

  if (loading) {
    return <h1 className='text-2xl font-bold text-center mt-10'>Loading...</h1>;
  }

  if (!pokemonData) {
    return (
      <h1 className='text-2xl font-bold text-center mt-10'>
        Pokémon not found
      </h1>
    );
  }

  console.log(pokemonData);
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white rounded-lg shadow-lg p-6 m-4 w-full max-w-sm'>
        <h1 className='text-3xl font-bold mb-5 text-center capitalize'>
          {pokemonData.name}
        </h1>
        <img
          className='w-32 h-32 mx-auto mb-5'
          src={pokemonData.sprites?.back_default}
          alt={pokemonData.name}
        />
        <div className='mb-5 text-center'>
          <audio controls className='w-full'>
            <source src={pokemonData.cries?.legacy} type='audio/mpeg' />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div>
          <ul className='list-disc list-inside grid grid-cols-2'>
            {pokemonData.stats?.map((item, index) => (
              <li key={index} className='mb-2'>
                <span className='font-bold'>Stat:</span> {item.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
