import * as React from "react";
import { BehaviorSubject, debounceTime, mapTo } from "rxjs";
import { PokemonContext } from "../App";

interface ISearchProps {
  onInput?: (text: string) => void;
}

const Search: React.FunctionComponent<ISearchProps> = (props) => {
  const [searchAction] = React.useState(new BehaviorSubject(""));
  const search$ = React.useMemo(
    () => searchAction.pipe(debounceTime(300)),
    [searchAction]
  );

  const observer = React.useCallback(
    (text: string) => {
      if (props.onInput) {
        props.onInput(text);
      }
    },
    [searchAction]
  );

  React.useEffect(() => {
    const subscription = search$.subscribe(observer);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        onInput={(event) => {
          const textInput = (event.target as any).value;
          searchAction.next(textInput);
        }}
      />
    </div>
  );
};

export default Search;
