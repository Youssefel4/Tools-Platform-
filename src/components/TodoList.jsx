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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Todo List"
        description="Free online todo list manager - create, organize, and track your tasks. Simple and effective task management tool to boost your productivity. Works offline with local storage."
        keywords="todo list, task manager, to do list, productivity tool, task tracker, checklist, task organizer, free todo app, productivity app, task management"
        url="https://platformtools.netlify.app/todo-list"
      />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            To-Do <span className="text-gradient">List</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Manage your tasks {session ? 'securely in the cloud' : 'privately on your device'}
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden mb-8 shadow-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8 relative z-10">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-inner"
              placeholder="What needs to be done?"
            />
            <button
              onClick={addTodo}
              disabled={!inputValue.trim()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg whitespace-nowrap"
            >
              <span>➕</span> Add Task
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 relative z-10 gap-4">
            <div className="flex bg-white/40 dark:bg-gray-800/40 p-1.5 rounded-xl border border-gray-100 dark:border-gray-700/50 w-full sm:w-auto overflow-x-auto custom-scrollbar">
              <button
                onClick={() => setFilter('all')}
                className={`px-5 py-2.5 rounded-lg transition-all font-bold text-sm flex-1 sm:flex-none whitespace-nowrap ${filter === 'all'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
              >
                All ({todos.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-5 py-2.5 rounded-lg transition-all font-bold text-sm flex-1 sm:flex-none whitespace-nowrap ${filter === 'active'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
              >
                Active ({activeTodosCount})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-5 py-2.5 rounded-lg transition-all font-bold text-sm flex-1 sm:flex-none whitespace-nowrap ${filter === 'completed'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
              >
                Completed ({completedTodosCount})
              </button>
            </div>

            {completedTodosCount > 0 && (
              <button
                onClick={clearCompleted}
                className="px-5 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-bold rounded-xl border border-red-100 dark:border-red-800/50 shadow-sm transition-all duration-300 w-full sm:w-auto whitespace-nowrap"
              >
                Clear Completed
              </button>
            )}
          </div>

          <div className="space-y-3 relative z-10">
            {loading ? (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading tasks...</p>
              </div>
            ) : filteredTodos.length === 0 ? (
              <div className="text-center py-16 bg-white/30 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-700/30 border-dashed">
                <div className="text-5xl mb-4 opacity-50">📝</div>
                <div className="text-gray-900 dark:text-white font-bold text-xl mb-2">
                  {filter === 'completed' ? 'No completed tasks' :
                    filter === 'active' ? 'No active tasks' :
                      'Your list is empty'}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {filter === 'all' ? 'Add a task above to get started!' : 'Change filter to see other tasks'}
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-8 relative overflow-hidden mb-8 shadow-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative z-10 flex items-center gap-2">
            <span>📊</span> Productivity Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="text-center p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm flex flex-col items-center justify-center">
              <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">
                {todos.length}
              </div>
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Tasks</div>
            </div>
            <div className="text-center p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm flex flex-col items-center justify-center">
              <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2">
                {completedTodosCount}
              </div>
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completed</div>
            </div>
            <div className="text-center p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm flex flex-col items-center justify-center">
              <div className="text-4xl font-black text-amber-500 dark:text-amber-400 mb-2 flex items-baseline justify-center">
                {todos.length > 0 ? Math.round((completedTodosCount / todos.length) * 100) : 0}<span className="text-xl ml-1">%</span>
              </div>
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completion Rate</div>
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
    <div className={`group flex flex-col sm:flex-row items-start sm:items-center p-4 rounded-2xl border transition-all duration-300 hover:shadow-md ${todo.completed
      ? 'bg-gray-50/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700/50 opacity-80'
      : 'bg-white/80 dark:bg-gray-800/90 border-gray-200 dark:border-gray-600 shadow-sm'
      }`}>
      
      <div className="flex items-center w-full sm:w-auto flex-1 gap-4">
        <label className="relative flex cursor-pointer items-center justify-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="peer sr-only"
          />
          <div className="h-6 w-6 rounded-md border-2 border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-500"></div>
          <svg className="absolute w-4 h-4 text-white opacity-0 transition-opacity peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </label>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2 border border-blue-300 dark:border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900/50 dark:text-white bg-blue-50 dark:bg-blue-900/10 shadow-inner w-full"
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 text-lg font-medium cursor-text break-all transition-all ${todo.completed
              ? 'line-through text-gray-400 dark:text-gray-500'
              : 'text-gray-800 dark:text-gray-100'
              }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2 mt-4 sm:mt-0 w-full sm:w-auto justify-end sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 dark:text-emerald-400 rounded-xl transition-colors font-bold text-sm"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 rounded-xl transition-colors font-bold text-sm"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              title="Edit"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              title="Delete"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoList;
