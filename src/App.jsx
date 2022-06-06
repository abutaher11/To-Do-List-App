import { useState } from "react";
import "./styles.css";
import uuid from "react-uuid";

export default function App() {
  const [item, setItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [deleting, setDeleting] = useState(false);

  const addToDo = () => {
    const time = new Date().toLocaleString();
    const toDo = {
      id: uuid(),
      value: item,
      timeAdd: time
    };
    setTodos((oldList) => [...oldList, toDo]);
    setItem("");
  };

  const sortTodo = () => {
    const sorterdToD0 = todos.sort((a, b) =>
      a.value > b.value ? 1 : b.value > a.value ? -1 : 0
    );
    setTodos((oldList) => [...sorterdToD0]);
  };
  const deleteTodos = (id) => {
    setDeleting(true);
    setTimeout(() => {
      const newToDos = todos.filter((elem) => elem.id !== id);
      setTodos(newToDos);
      setDeleting(false);
    }, "1000");
  };

  return (
    <div className="App">
      <h1 className="app-header">To Do List</h1>
      <input
        type="text"
        placeholder="Add to do"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button onClick={addToDo}>Add To Do</button>
      <button onClick={sortTodo}>Sort To Do</button>
      {deleting && <div>deleting...</div>}
      <ul>
        {todos.map((item) => {
          return (
            <li key={item.id} id="item">
              Task: {item.value}
              <div>Added on: {item.timeAdd}</div>
              {item.deleting === true && <div>Loading...</div>}
              <button onClick={() => deleteTodos(item.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
