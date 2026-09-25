import React, { useState, useEffect } from 'react';
import { LuSquareCheck, LuPlus, LuCheck, LuTrash2, LuClock } from 'react-icons/lu';
import ToolLayout from './ToolLayout';
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

  const faqs = [
    {
      question: "Are my tasks saved when I close the browser?",
      answer: "Yes, your task list is encrypted and stored locally in your browser's persistent storage, or synchronized securely to the cloud if signed in."
    },
    {
      question: "Can I use this to-do list offline?",
      answer: "Yes, the to-do list is client-side optimized and functions smoothly without an internet connection."
    },
    {
      question: "Is there any limit to how many tasks I can create?",
      answer: "No, you can create and manage unlimited tasks and checklists completely free."
    }
  ];

  const howToUse = [
    { title: "Add New Task", desc: "Type your item in the box and press Enter or click Add Task." },
    { title: "Track & Complete", desc: "Click the checkbox to cross off tasks as you finish them." },
    { title: "Filter Status", desc: "Filter by All, Active, or Completed to maintain focus." }
  ];

  const features = [
    { title: "Local Encryption", desc: "Tasks are secured locally in your browser's persistent storage." },
    { title: "Double-Click to Edit", desc: "Easily update task wording by double-clicking any line item." },
    { title: "Productivity Stats", desc: "Live completion rate and counts keep you motivated." }
  ];

  return (
    <ToolLayout
      title="Online To-Do List & Task Manager"
      subtitle="Organize daily tasks, track progress, and manage checklists with encrypted local browser storage."
      category="timers"
      categoryName="Timers & Productivity"
      icon={LuSquareCheck}
      badge="Productivity"
      seoDescription="Free online to-do list and task manager. Create checklists, filter active and completed tasks, and save progress with 100% local privacy."
      seoKeywords="todo list, online task manager, free todo app, daily checklist, task tracker, productivity checklist"
      howToUse={howToUse}
      features={features}
      faqs={faqs}
      relatedToolIds={['notes', 'pomodoro-timer', 'stopwatch']}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Input Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-5 py-3.5 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner text-sm font-medium"
            placeholder="What needs to be done? Press Enter to add..."
          />
          <button
            onClick={addTodo}
            disabled={!inputValue.trim()}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-sm transition-all disabled:opacity-40 flex items-center gap-1.5 text-sm flex-shrink-0"
          >
            <LuPlus size={16} /> Add Task
          </button>
        </div>

        {/* Filter Bar & Clear Completed */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'all' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              All ({todos.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'active' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              Active ({activeTodosCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'completed' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              Done ({completedTodosCount})
            </button>
          </div>

          {completedTodosCount > 0 && (
            <button
              onClick={clearCompleted}
              className="text-xs text-red-500 hover:text-red-600 font-semibold px-2 py-1"
            >
              Clear Completed
            </button>
          )}
        </div>

        {/* Tasks List */}
        <div className="space-y-2">
          {loading ? (
            <div className="text-center py-8 text-slate-400 text-sm">Loading tasks...</div>
          ) : filteredTodos.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 space-y-1">
              <p className="font-semibold text-sm">No tasks in this list</p>
              <p className="text-xs">Type a new task above and get started!</p>
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

        {/* Productivity Stat Pills */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{todos.length}</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">{completedTodosCount}</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Completed</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <span className="text-lg font-black text-blue-600 dark:text-blue-400 font-mono">
              {todos.length > 0 ? Math.round((completedTodosCount / todos.length) * 100) : 0}%
            </span>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Rate</p>
          </div>
        </div>
      </div>
    </ToolLayout>
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

  return (
    <div className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all ${
      todo.completed
        ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm'
    }`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
            todo.completed
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-slate-300 dark:border-slate-600 hover:border-blue-500'
          }`}
        >
          {todo.completed && <LuCheck size={14} />}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            className="flex-1 px-2 py-1 bg-blue-50 dark:bg-slate-700 rounded border border-blue-300 text-sm font-medium focus:outline-none"
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={`text-sm font-medium truncate cursor-pointer ${
              todo.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-slate-300 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2"
        title="Delete"
      >
        <LuTrash2 size={14} />
      </button>
    </div>
  );
};

export default TodoList;
