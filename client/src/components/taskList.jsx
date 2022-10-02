import React from "react";
import "./taskList.css";
import { useEffect, useState } from "react";
// const API_BASE = "http://localhost:3001";

const TaskList = () => {
  const [todos, setTodos] = useState([]);
  const [addButton, setAddButton] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    //Get Todos
    try {
      const res = await fetch("http://localhost:3001/toDo");
      const todos = await res.json();
      setTodos(todos);
      if (todos.length === 0) {
        //Error handling if our get request returns an empty array
        setTodos([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const completeToDo = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/toDo/complete/${id}`, {
        //Onclick will fetch the backend route for completeToDO
        method: "PUT", //Then on the backend it will update to the opposite of te boolean value and return the response
        headers: {
          "Content-Type": "application/json",
        },
      });
      const completed = await res.json(); //The response is the single document that changed on the backend
      setTodos(
        todos.map((todo) => {
          //iterate through the todos and if the id of the todo is === to the res.json id set that todo property to the res property
          if (todo._id === completed._id) {
            todo.completed = completed.completed;
          }
          return todo;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteToDo = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/toDo/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const deleted = await res.json();
      setTodos(
        todos.map((todo) => {
          if (todo._id !== deleted._id) {
            // return todo;
          }
          return todo
        })
      ); //Filter out any todos with the deleted id
    } catch (error) {
      console.log(error);
    }
  };

  const addToDo = async () => {
    try {
      const res = await fetch(`http://localhost:3001/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newTodo,
        }),
      });
      const newTask = await res.json();
      setTodos([...todos, newTask])
      setAddButton(false)
      setNewTodo('')
    } catch (error) {}
  };

  const handleChange = (e) => {
    setNewTodo(e.target.value)
  }

  return (
    <div className="taskContainer">
      <h1>Welcome, Samudra</h1>
      <h2>These are your daily tasks</h2>
      <div className="todos">
        {todos.map((todo) => (
          <div
            className={"todo " + (todo.completed ? "is-complete" : "")}
            key={todo._id}
            onClick={() => completeToDo(todo._id)}
          >
            <div className="checkbox"></div>
            <div className="text">{todo.text}</div>
            <div className="delete-todo" onClick={() => deleteToDo(todo._id)}>
              X
            </div>
          </div>
        ))}
      </div>

      <div className="addPopup" onClick={() => setAddButton(true)}>
        +
      </div>
      {addButton ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setAddButton(false)}>
            x
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={handleChange}
              value={newTodo}
            />
            <div className="button" onClick={() => addToDo()}>Add Task</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TaskList;
