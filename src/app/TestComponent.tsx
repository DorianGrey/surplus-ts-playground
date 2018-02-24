// @ts-ignore
import * as Surplus from "surplus";
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

export function createTestComponent(): HTMLElement {
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

  /*
    Inserting this block does not work yet:
    {
        todos.map(todo => (
          <div>
            <input type="checkbox" fn={data(todo.done)} />
            <input type="text" fn={data(todo.title)} />
            <a onClick={() => todos.remove(todo)}>&times;</a>
          </div>
        ))
      }
  */

  const view = S.root(() => (
    // declarative main view
    <div>
      <h2>Minimalist ToDos in Surplus</h2>
      <input type="text" fn={data(newTitle)} />
      <a onClick={addTodo}> + </a>
    </div>
  ));

  return view;
}
