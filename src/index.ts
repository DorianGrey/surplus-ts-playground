import S from "s-js";
import { createTestComponent } from "./app/TestComponent";

S.root(() => {
  const component = createTestComponent();

  document.body.appendChild(component);
});
