import * as React from "react";
import { PokemonContext } from "../App";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  const context = React.useContext(PokemonContext);
  return (
    <div className="footer">
      application version : {context.applicationVersion}
    </div>
  );
};

export default Footer;
