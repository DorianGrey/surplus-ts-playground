import S from "s-js";
import { createTestComponent } from "./app/TestComponent";

let currentMainComponent: HTMLElement | null = null;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function() {
    if (currentMainComponent) {
      currentMainComponent.remove();
    }
  });
}

S.root(() => {
  currentMainComponent = createTestComponent();

  document.body.appendChild(currentMainComponent);
});
