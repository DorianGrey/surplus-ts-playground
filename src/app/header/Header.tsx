import "./Header.scss";

import * as Surplus from "surplus";
Surplus;

export function Header() {
  return (
    <header id="header">
      <div>TestHeader</div>
      <nav>
        <a href="/mirror">Mirror</a>
        <a href="/todos">Todos</a>
      </nav>
    </header>
  );
}
