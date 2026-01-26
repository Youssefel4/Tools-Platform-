import React, { useState, useEffect } from 'react';
import SEO from './SEO';
import { supabaseHelpers } from '../config/supabase';
import { setEncryptedItem, getEncryptedItem } from '../utils/encryption';

const Notes = ({ session }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      setLoading(true);
      supabaseHelpers.getNotes(session.user.id)
        .then(data => {
          setNotes(data || []);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching notes:', err);
          setLoading(false);
        });
    } else {
      // Fallback to encrypted local storage if no session
      const savedNotes = getEncryptedItem('notes');
      if (savedNotes) {
        setNotes(savedNotes);
      }
    }
  }, [session]);

  const saveNote = async () => {
    if (currentNote.title.trim() === '' && currentNote.content.trim() === '') {
      return;
    }

    try {
      if (session?.user?.id) {
        const noteData = {
          user_id: session.user.id,
          title: currentNote.title,
          content: currentNote.content
        };

        if (isEditing && currentNote.id) {
          // Provide ID if updating, but Supabase upsert might need existing ID to match
          // schema uses ID DEFAULT gen_random_uuid().
          // If we are editing, we should pass ID.
          noteData.id = currentNote.id;
        }

        const savedData = await supabaseHelpers.saveNote(noteData);
        // Optimistic update or refetch
        if (savedData && savedData[0]) {
          if (isEditing) {
            setNotes(notes.map(n => n.id === currentNote.id ? savedData[0] : n));
          } else {
            setNotes([savedData[0], ...notes]);
          }
        }
      } else {
        // Local Storage Fallback
        if (isEditing) {
          setNotes(notes.map(note =>
            note.id === currentNote.id ? currentNote : note
          ));
        } else {
          const newNote = {
            ...currentNote,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          setNotes([newNote, ...notes]);
        }
        // Save to local storage effect will handle it? 
        // No, we removed the useEffect that saves to local storage on change. 
        // We should save manually or re-add the effect for non-session users?
        // For simplicity, let's keep the local storage effect BUT only if !session?
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }

    setCurrentNote({ id: null, title: '', content: '' });
    setIsEditing(false);
  };

  // Persist to encrypted local storage only if NO session
  useEffect(() => {
    if (!session?.user?.id) {
      setEncryptedItem('notes', notes);
    }
  }, [notes, session]);

  const editNote = (note) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  const deleteNote = async (id) => {
    if (session?.user?.id) {
      try {
        await supabaseHelpers.deleteNote(id);
        setNotes(notes.filter(note => note.id !== id));
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    } else {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const cancelEdit = () => {
    setCurrentNote({ id: null, title: '', content: '' });
    setIsEditing(false);
  };

  const filteredNotes = notes.filter(note =>
    (note.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (note.content?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SEO
        title="Notes App"
        description="Free online notes app - create, edit, and manage your notes with local storage. Private, secure, and works offline. Perfect for personal notes, ideas, and reminders."
        keywords="notes app, online notepad, note taking app, local notes, privacy notes, secure notes, offline notes, note organizer, digital notebook, free notes"
        url="https://platformtools.netlify.app/notes"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Notes App
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create, edit, and manage your notes {session ? 'stored in cloud' : 'locally'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {isEditing ? 'Edit Note' : 'Create New Note'}
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter note title..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  value={currentNote.content}
                  onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows="8"
                  placeholder="Enter note content..."
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={saveNote}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {isEditing ? 'Update Note' : 'Save Note'}
                </button>
                {isEditing && (
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="mt-8">
              {/* AdSense Removed */}
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Your Notes ({notes.length})
                </h2>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Search notes..."
                />
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {loading ? (
                  <p className="text-center text-gray-500">Loading notes...</p>
                ) : filteredNotes.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    {searchTerm ? 'No notes found matching your search.' : 'No notes yet. Create your first note!'}
                  </p>
                ) : (
                  filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {note.title || 'Untitled Note'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2 line-clamp-3">
                        {note.content}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatDate(note.updated_at || note.updatedAt || note.created_at)}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => editNote(note)}
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
