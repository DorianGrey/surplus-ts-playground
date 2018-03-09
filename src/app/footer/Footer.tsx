import * as Surplus from "surplus";
// tslint:disable-next-line:no-unused-expression
Surplus; // Expression is a workaround to prevent the module from being dropped ...

import S from "s-js";

import { Clock } from "./Clock";

export function Footer() {
  return S.root(() => (
    <footer>
      <div>Test footer</div>
      <Clock />
    </footer>
  ));
}
