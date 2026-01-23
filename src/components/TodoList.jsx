import React, { useState, useEffect } from 'react';
import SEO from './SEO';
import { supabaseHelpers } from '../config/supabase';
import { setEncryptedItem, getEncryptedItem } from '../utils/encryption';

const TodoList = ({ session }) => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      setLoading(true);
      supabaseHelpers.getTodos(session.user.id)
        .then(data => {
          setTodos(data || []);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching todos:', err);
          setLoading(false);
        });
    } else {
      const savedTodos = getEncryptedItem('todos');
      if (savedTodos) {
        setTodos(savedTodos);
      }
    }
  }, [session]);

  const addTodo = async () => {
    if (inputValue.trim() === '') return;

    try {
      const newTodo = {
        text: inputValue.trim(),
        completed: false
      };

      if (session?.user?.id) {
        newTodo.user_id = session.user.id;
        const savedData = await supabaseHelpers.saveTodo(newTodo);
        if (savedData && savedData[0]) {
          setTodos([savedData[0], ...todos]);
        }
      } else {
        const localTodo = {
          ...newTodo,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        const newTodos = [localTodo, ...todos];
        setTodos(newTodos);
        setEncryptedItem('todos', newTodos);
      }
      setInputValue('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id) => {
    const todoToToggle = todos.find(t => t.id === id);
    if (!todoToToggle) return;

    // Optimistic update
    const updatedStatus = !todoToToggle.completed;
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: updatedStatus } : todo
    );
    setTodos(updatedTodos);

    if (session?.user?.id) {
      try {
        await supabaseHelpers.saveTodo({ ...todoToToggle, completed: updatedStatus });
      } catch (error) {
        console.error('Error toggling todo:', error);
      }
    } else {
      setEncryptedItem('todos', updatedTodos);
    }
  };

  const deleteTodo = async (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);

    if (session?.user?.id) {
      try {
        await supabaseHelpers.deleteTodo(id);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    } else {
      setEncryptedItem('todos', updatedTodos);
    }
  };

  const editTodo = async (id, newText) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updatedTodos = todos.map(t =>
      t.id === id ? { ...t, text: newText } : t
    );
    setTodos(updatedTodos);

    if (session?.user?.id) {
      try {
        await supabaseHelpers.saveTodo({ ...todo, text: newText });
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    } else {
      setEncryptedItem('todos', updatedTodos);
    }
  };

  const clearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    setTodos(activeTodos);

    if (session?.user?.id) {
      completedTodos.forEach(async (todo) => {
        try {
          await supabaseHelpers.deleteTodo(todo.id);
        } catch (e) { console.error(e); }
      });
    } else {
      setEncryptedItem('todos', activeTodos);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SEO
        title="To-Do List"
        description="Simple and effective to-do list manager to track your tasks and productivity."
        keywords="todo list, task manager, productivity, checklist, task tracker"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            To-Do List
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tasks {session ? 'in the cloud' : 'locally'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex space-x-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="What needs to be done?"
            />
            <button
              onClick={addTodo}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Task
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-md transition-colors ${filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                All ({todos.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1 rounded-md transition-colors ${filter === 'active'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                Active ({activeTodosCount})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 rounded-md transition-colors ${filter === 'completed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                Completed ({completedTodosCount})
              </button>
            </div>

            {completedTodosCount > 0 && (
              <button
                onClick={clearCompleted}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Clear Completed
              </button>
            )}
          </div>

          <div className="space-y-2">
            {loading ? (
              <p className="text-center text-gray-500">Loading tasks...</p>
            ) : filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-2">
                  {filter === 'completed' ? 'No completed tasks' :
                    filter === 'active' ? 'No active tasks' :
                      'No tasks yet'}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {filter === 'all' ? 'Add a task to get started!' : 'Change filter to see other tasks'}
                </p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {todos.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {completedTodosCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {todos.length > 0 ? Math.round((completedTodosCount / todos.length) * 100) : 0}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {/* AdSense Removed */}
        </div>
      </div>
    </div>
  );
};

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg border ${todo.completed
      ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
      }`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 cursor-pointer ${todo.completed
            ? 'line-through text-gray-500 dark:text-gray-400'
            : 'text-gray-900 dark:text-white'
            }`}
          onClick={() => onToggle(todo.id)}
        >
          {todo.text}
        </span>
      )}

      <div className="flex items-center space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-2 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoList;
