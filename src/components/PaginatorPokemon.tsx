import * as React from "react";
import {
  BehaviorSubject,
  combineLatest,
  from,
  ReplaySubject,
  Subject,
} from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  debounceTime,
  map,
  mergeAll,
  switchMap,
  toArray,
} from "rxjs/operators";
import { PokemonModel, PokemonPaginatorResponse } from "../models/pokemon";

interface IPaginatorPokemonProps {
  limit: number;
  offset: number;
  onCountChange?: (count: number) => void;
}

const PaginatorPokemon: React.FunctionComponent<IPaginatorPokemonProps> = (
  props
) => {
  const pokemons = useLoadPokemon(props);
  return (
    <div style={{ display: "flex" }}>
      {pokemons?.map((pokemon) => (
        <div key={pokemon.name}>
          <div>{pokemon.name}</div>
          <div>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        </div>
      ))}
    </div>
  );
};

function useLoadPokemon(props: IPaginatorPokemonProps) {
  const [pokemons, setPokemons] = React.useState<PokemonModel[]>();
  const [limitAction$] = React.useState(new ReplaySubject<number>(1));
  const [offsetAction$] = React.useState(new ReplaySubject<number>(1));
  // const React
  const paginatorChange$ = React.useMemo(
    () => combineLatest([limitAction$, offsetAction$]),
    [limitAction$, offsetAction$]
  );
  React.useEffect(() => {
    limitAction$.next(props.limit);
  }, [props.limit]);

  React.useEffect(() => {
    offsetAction$.next(props.offset);
  }, [props.offset]);

  React.useEffect(() => {
    const subscription = paginatorChange$
      .pipe(
        debounceTime(400),
        switchMap(([limit, offset]) => {
          return ajax
            .getJSON<PokemonPaginatorResponse>(
              `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
            )
            .pipe(
              switchMap((response) => {
                if (props.onCountChange) {
                  props.onCountChange(response.count);
                }
                return from(response.results).pipe(
                  map((result) => ajax.getJSON<PokemonModel>(result.url)),
                  mergeAll(),
                  toArray()
                );
              })
            );
        })
      )
      .subscribe((models) => {
        setPokemons(models);
      });
    return () => subscription.unsubscribe();
  }, []);

  return pokemons;
}

export default PaginatorPokemon;
