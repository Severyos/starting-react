import React, { useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";


function App() {
  const [todos, setTodos] = useState([]);
  const [filterText, setFilterText] = useState("");

  function handleFilterTextChange(e) {
    setFilterText(e.target.value);
  }
  
  const addTodo = (text) => {
    let id = 1;
    if(todos.length > 0) {
      id = todos[0].id + 1
    }
    let todo = {id: id, text: text, completed: false, important: false}
    let newTodos = [todo, ...todos]
    setTodos(newTodos)
  };

  const removeTodo = (id) => {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  function clearAllTodos() {
    setTodos([]);
  }

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  
  
  const importantTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.important = !todo.important
      }
      return todo
    })
    
    setTodos(updatedTodos)
  }

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(filterText.toLowerCase())
    
  
  );
  let sortedAndFilteredTodos = filteredTodos.sort((a, b) => b.important - a.important)

  return (
    <div className="todo-app">
      <h1>To-do Lista</h1>
      <TodoForm addTodo={addTodo} />
      <input
        type="text"
        onChange={handleFilterTextChange}
        className="todo-filter"
        placeholder="Sök Todo"
      />
      <hr className="seperator"/>
      {sortedAndFilteredTodos.map((todo) => {
        return (
          <TodoItem removeTodo={removeTodo} completeTodo={completeTodo} importantTodo={importantTodo} todo={todo} key={todo.id}/>
        )
      })}
      <button onClick={clearAllTodos} className="clear-btn">Rensa allt</button>
    </div>
  );
  
  
}

export default App;