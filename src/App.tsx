import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./components/Search";
import { Pokemon } from "./models/pokemon";
import Footer from "./components/Footer";
import RenderPokemon from "./components/RenderPokemon";
import PaginatorPokemon from "./components/PaginatorPokemon";

export const PokemonContext = React.createContext({
  applicationVersion: 10,
});

function App() {
  // const [pokemons, setPokemons] = React.useState<Pokemon[]>([
  //   {
  //     name: "ditto",
  //     active: "N",
  //   },
  //   {
  //     name: "pikachu",
  //     active: "Y",
  //   },
  //   { name: "giraffe", active: "N" },
  //   { name: "Lucario", active: "N" },
  // ]);

  const [limit, setLimit] = React.useState<number>(10);
  const [offset, setOffset] = React.useState<number>(0);
  const [count, setCount] = React.useState<number>(0);
  const totalPage = React.useMemo(() => {
    return Math.ceil(count / limit);
  }, [count, limit]);

  const currentPage = React.useMemo(() => {
    return (offset + limit) / limit;
  }, [count, limit, offset]);

  return (
    <div className="App">
      {/* <Search
        onInput={(text) => {
          const filterPokemons = pokemons.filter(
            (pokemon) => pokemon.name.indexOf(text) !== -1
          );
          setPokemons(filterPokemons);
        }}
      ></Search> */}

      <div>
        <button
          onClick={() =>
            setOffset((offset) => {
              if (offset - limit < 0) {
                return 0;
              }
              return offset - limit;
            })
          }
        >
          prev
        </button>
        <span>
          หน้า {currentPage}/{totalPage}
        </span>
        <button onClick={() => setOffset((offset) => offset + limit)}>
          next
        </button>
        <PaginatorPokemon
          onCountChange={(count) => setCount(count)}
          limit={limit}
          offset={offset}
        ></PaginatorPokemon>
      </div>
      {/* <RenderPokemon pokemons={pokemons}></RenderPokemon> */}

      <Footer></Footer>
    </div>
  );
}

export default App;
