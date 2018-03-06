import * as Surplus from "surplus";
// tslint:disable-next-line:no-unused-expression
Surplus; // Expression is a workaround to prevent the module from being dropped ...

import { Header } from "./header/Header";

export function App(): HTMLElement[] {
  return [<Header />, <main id="main" />, <footer>Test footer</footer>];
}
