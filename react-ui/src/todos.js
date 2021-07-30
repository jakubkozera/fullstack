import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import Todo from "./todo";
const Todos = () => {
  const todoRef = useRef();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  const fetchTodos = async () => {
    const { data: todos } = await axios.get("https://localhost:44388/toDo");
    return todos;
  };

  const createTodo = async (todo) => {
    await axios.post("https://localhost:44388/toDo", { description: todo });
  };

  const handleClick = async () => {
    const newTodo = todoRef.current.value;
    await createTodo(newTodo);
    const todos = await fetchTodos();
    setTodos(todos);

    todoRef.current.value = "";
  };
  return (
    <div>
      <h1>React Todos:</h1>
      <div>
        {todos.map((t) => (
          <Todo {...t} />
        ))}
      </div>

      <h1>New:</h1>
      <input type="text" ref={todoRef} />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};
export default Todos;
