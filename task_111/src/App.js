import React, { useState } from 'react';

// Компонент для отдельного дела
const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const handleEdit = () => {
    const newText = prompt("Редактировать дело:", todo.text);
    if (newText) onEdit(todo.id, newText);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => onToggle(todo.id)} 
      />
      <span 
        style={{ 
          textDecoration: todo.completed ? 'line-through' : 'none', 
          marginLeft: '10px',
        }}
      >
        {todo.text}
      </span>
      <button onClick={handleEdit} style={{ marginLeft: '10px' }}>Редактировать</button>
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: '10px' }}>Удалить</button>
    </div>
  );
};

// Компонент для списка дел
const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={onToggle} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
};

// Основной компонент приложения
const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false }
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  return (
    <div>
      <h1>Чеклист</h1>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Введите новое дело"
      />
      <button onClick={addTodo}>Добавить дело</button>
      <TodoList 
        todos={todos} 
        onToggle={toggleTodo} 
        onDelete={deleteTodo} 
        onEdit={editTodo} 
      />
    </div>
  );
};

export default App;
