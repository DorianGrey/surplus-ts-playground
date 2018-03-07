import * as Surplus from "surplus";
// tslint:disable-next-line:no-unused-expression
Surplus;
import S from "s-js";

import { Clock } from "../footer/Clock";

export function Mirror() {
  return S.root(() => (
    <div>
      <div>I will be a mirror component.</div>
      <Clock />
    </div>
  ));
}
