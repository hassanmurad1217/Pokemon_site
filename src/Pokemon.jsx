import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";
export const Pokemon = () => {
  const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      //   console.log(data);

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const response = await fetch(curPokemon.url);
        // console.log(curPokemon.url);
        const data = await response.json();
        return data;
      });

      const detailedResponse = await Promise.all(detailedPokemonData);
      console.log(detailedResponse);
      setPokemon(detailedResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPokemon();
    })();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch pokemon</h1>
        </header>
        <div>
          <ul className="cards">
            {pokemon.map((curPokemon) => (
              <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
