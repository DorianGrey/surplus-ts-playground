// @ts-ignore
import * as Surplus from "surplus";
Surplus; // Expression is a workaround to prevent the module from being dropped ...
import SArray from "s-array";
import S, { DataSignal } from "s-js";
import data from "surplus-mixin-data";

interface TodoContent {
  title: string;
  done: boolean;
}

interface Todo {
  title: DataSignal<string>;
  done: DataSignal<boolean>;
}

export function createTestComponent() {
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
    <div>
      <input type="checkbox" fn={data(todo.done)} />
      <input type="text" fn={data(todo.title)} />
      <a onClick={() => todos.remove(todo)}>&times;</a>
    </div>
  );

  // TODO: This part still causes a curious typing error, even though everything works fine ... ?!
  const view = (
    <article>
      <h2>Minimalist ToDos in Surplus</h2>
      <input type="text" fn={data(newTitle)} />
      <a onClick={addTodo}> + </a>
      {todos.map(todoElem)}
    </article>
  );

  return view;
}
