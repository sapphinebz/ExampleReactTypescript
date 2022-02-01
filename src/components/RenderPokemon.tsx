import * as React from "react";
import { Pokemon } from "../models/pokemon";

interface IRenderPokemonProps {
  pokemons: Pokemon[];
}

const RenderPokemon: React.FunctionComponent<IRenderPokemonProps> = (props) => {
  const active = React.useMemo(() => {
    return props.pokemons.reduce((sum, p) => {
      if (p.active === "Y") {
        return ++sum;
      }
      return sum;
    }, 0);
  }, [props.pokemons]);

  const notActive = React.useMemo(() => {
    return props.pokemons.reduce((sum, p) => {
      if (p.active === "N") {
        return ++sum;
      }
      return sum;
    }, 0);
  }, [props.pokemons]);
  return (
    <div>
      {props.pokemons.map((pokemon) => (
        <div key={pokemon.name}>
          <div>ชื่อ: {pokemon.name}</div>
          <div>สถานะ: {renderActive(pokemon.active)}</div>
        </div>
      ))}

      <div>total พร้อมสู้ : {active}</div>
      <div>total ไม่พร้อมสู้: {notActive}</div>
    </div>
  );
};

function renderActive(active: "Y" | "N") {
  if (active === "Y") {
    return "พร้อมสู้";
  }
  return "ไม่พร้อมสู้";
}

export default RenderPokemon;
