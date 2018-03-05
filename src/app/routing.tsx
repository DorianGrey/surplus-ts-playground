import page from "page";

import { NotFound } from "./404/404";
import { Mirror } from "./mirror/Mirror";
import { TodoComponent } from "./todos/TodoComponent";

const getMountPoint = () => document.getElementById("main");
let lastMountedElement: HTMLElement | null = null;

function unmount() {
  if (lastMountedElement) {
    lastMountedElement.remove();
    lastMountedElement = null;
  }
}

function mount(component: HTMLElement) {
  unmount();
  const target = getMountPoint();
  if (target) {
    target.appendChild(component);
    lastMountedElement = component;
  }
}

page.redirect("/", "/mirror");
page("/mirror", () => mount(<Mirror />));
page("/todos", () => mount(<TodoComponent />));
page("*", () => mount(<NotFound />));

export default page;
