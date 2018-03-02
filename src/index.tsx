import S from "s-js";

import { App } from "./app/App";
import "./styles/index.scss";

let currentMainComponents: HTMLElement[] = [];

// Simple and stupid HMR API...
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function() {
    currentMainComponents.forEach(e => e.remove());
  });
}

S.root(() => {
  currentMainComponents = App();
  currentMainComponents.forEach(e => {
    document.body.appendChild(e);
  });
});
