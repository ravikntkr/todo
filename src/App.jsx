import React, { useReducer, useState } from "react";

const todoReducer = (state, action) => {
  const handlers = {
    ADD_TODO: () => [
      ...state,
      { id: Date.now(), text: action.payload, completed: false },
    ],
    TOGGLE_TODO: () =>
      state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      ),
    EDIT_TODO: () =>
      state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      ),
    DELETE_TODO: () => state.filter((todo) => todo.id !== action.payload),
  };

  return handlers[action.type] ? handlers[action.type]() : state;
};

const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch({ type: "ADD_TODO", payload: text });
      setText("");
    }
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const handleEditTodo = (id) => {
    setEditId(id);
    const todo = todos.find((todo) => todo.id === id);
    setEditText(todo.text);
  };

  const handleUpdateTodo = () => {
    dispatch({ type: "EDIT_TODO", payload: { id: editId, text: editText } });
    setEditId(null);
    setEditText("");
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const getCurrentDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = new Date().toLocaleDateString(undefined, options);
    return currentDate;
  };

  return (
    <div className="conatiner">
      <div className="main-container">
        <div className="date-area">
          <div className="date-box">
            <h2 className="day">{getCurrentDate()}</h2>
          </div>
          <div className="time-box">
            <p className="time">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        {/* Form */}
        <div className="todo-form">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new todo"
            className="todo-input"
            autoFocus
          />
          <button onClick={handleAddTodo} className="add-btn">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        {/* Todo list */}
        <ul className="todolist">
          {todos.map((todo) => (
            <li key={todo.id} className="list-items">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="checkbox"
              />
              {editId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                    autoFocus
                  />
                  <button onClick={handleUpdateTodo} className="update-button">
                    <i className="fa-solid fa-circle-check update-icon"></i>
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                    onClick={() => handleToggleTodo(todo.id)}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => handleEditTodo(todo.id)}
                    className="edit-button"
                  >
                    <i className="fa-solid fa-pencil edit"></i>
                  </button>
                </>
              )}
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="delete-btn"
              >
                <i className="fa-solid fa-trash-can delete-icon"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
