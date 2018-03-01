import S from "s-js";
import { createTestComponent } from "./app/TestComponent";

if (module.hot) {
  module.hot.accept();
}

S.root(() => {
  const component = createTestComponent();

  document.body.appendChild(component);
});
