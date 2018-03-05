import "./styles/index.scss";

import S from "s-js";

import { App } from "./app/App";
import router from "./app/routing";

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

  router.start();
});
