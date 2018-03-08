import "./styles/index.scss";

import { App } from "./app/App";

let currentMainComponents: HTMLElement[] = [];

function renderApp() {
  currentMainComponents = App();
  currentMainComponents.forEach(e => {
    document.body.appendChild(e);
  });
}

// Simple and stupid HMR API...
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function() {
    currentMainComponents.forEach(e => e.remove());
  });
}

renderApp();
