// @ts-ignore
import * as Surplus from "surplus";
Surplus; // Expression is a workaround to prevent the module from being dropped ...

export function App(): HTMLElement[] {
  return [
    <header>TestHeader</header>,
    <main id="main" />,
    <footer>Test footer</footer>
  ];
}
