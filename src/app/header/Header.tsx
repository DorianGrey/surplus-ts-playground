import "./Header.scss";

import * as Surplus from "surplus";
// tslint:disable-next-line:no-unused-expression
Surplus;

export function Header() {
  return (
    <header id="header">
      <div>TestHeader</div>
      <nav>
        <ul>
          <li>
            <a href="/mirror">Mirror</a>
          </li>
          <li>
            <a href="/todos">Todos</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
