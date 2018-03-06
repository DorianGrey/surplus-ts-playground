import * as Surplus from "surplus";
// tslint:disable-next-line:no-unused-expression
Surplus; // Expression is a workaround to prevent the module from being dropped ...

import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";

export function App(): HTMLElement[] {
  return [<Header />, <main id="main" />, <Footer />];
}
