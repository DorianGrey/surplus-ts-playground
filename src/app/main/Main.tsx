import page from "page";
import S from "s-js";
import * as Surplus from "surplus";
// tslint:disable-next-line:no-unused-expression
Surplus;

import { Loading } from "../Loading";
import { NotFound } from "../404/404";
import { Mirror } from "../mirror/Mirror";
import { TodoComponent } from "../todos/TodoComponent";

const viewFactory = S.data(() => <Loading />);
const view = S.root(() => S(() => viewFactory()()));

type PageCreationCallback = () => HTMLElement;

const configureRoute = (
  path: string,
  pageElemFactory: PageCreationCallback
) => {
  page(path, () => viewFactory(pageElemFactory));
};

page.redirect("/", "/mirror");
configureRoute("/mirror", () => <Mirror />);
configureRoute("/todos", () => <TodoComponent />);
configureRoute("*", () => <NotFound />);

export function Main() {
  page.start();
  return <main id="main">{view()}</main>;
}
