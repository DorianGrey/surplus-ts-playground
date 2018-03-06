// @ts-ignore
import * as Surplus from "surplus";
Surplus; // Expression is a workaround to prevent the module from being dropped ...

import { Header } from "./header/Header";

export function App(): HTMLElement[] {
  return [<Header />, <main id="main" />, <footer>Test footer</footer>];
}
