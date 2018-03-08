import "./styles/index.scss";

import { App } from "./app/App";
import startRouting from "./app/routing";

let currentMainComponents: HTMLElement[] = [];

// Simple and stupid HMR API...
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function() {
    currentMainComponents.forEach(e => e.remove());
  });
}

currentMainComponents = App();
currentMainComponents.forEach(e => {
  document.body.appendChild(e);
});

startRouting();
