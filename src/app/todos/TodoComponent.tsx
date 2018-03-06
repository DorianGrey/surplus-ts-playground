// @ts-ignore
import * as Surplus from "surplus";
Surplus; // Expression is a workaround to prevent the module from being dropped ...
import SArray from "s-array";
import S from "s-js";
import data from "surplus-mixin-data";

import { WithDataSignals } from "../util/dataSignalType";

interface TodoContent {
  title: string;
  done: boolean;
}

type Todo = WithDataSignals<TodoContent>;

export function TodoComponent() {
  const makeTodo = (t: TodoContent) =>
    ({
      // our Todo constructor
      title: S.data(t.title), // properties are data signals
      done: S.data(t.done)
    } as Todo);

  const todos = SArray<Todo>([]), // our array of todos
    newTitle = S.data(""), // title for new todos
    addTodo = () => {
      // push new title onto list
      todos.push(makeTodo({ title: newTitle(), done: false }));
      newTitle(""); // clear new title
    };

  const todoElem: (t: Todo) => JSX.Element = (todo: Todo) => (
    <li>
      <input type="checkbox" fn={data(todo.done)} />
      <input type="text" fn={data(todo.title)} />
      <a onClick={() => todos.remove(todo)}>&times;</a>
    </li>
  );

  const view = S.root(() => (
    <section>
      <h2>Minimalist ToDos in Surplus</h2>
      <input type="text" fn={data(newTitle)} />
      <a onClick={addTodo}> + </a>
      <ul>{todos.map(todoElem)}</ul>
    </section>
  ));

  return view;
}
