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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Notes App"
        description="Free online notes app - create, edit, and manage your notes with local storage. Private, secure, and works offline. Perfect for personal notes, ideas, and reminders."
        keywords="notes app, online notepad, note taking app, local notes, privacy notes, secure notes, offline notes, note organizer, digital notebook, free notes"
        url="https://platformtools.netlify.app/notes"
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Notes <span className="text-gradient">App</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Create, edit, and manage your notes {session ? 'stored securely in the cloud' : 'locally on your device'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Create/Edit Form */}
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 relative z-10 flex items-center gap-3">
                <span className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-xl text-blue-600 dark:text-blue-400">✍️</span> 
                {isEditing ? 'Edit Note' : 'Create New Note'}
              </h2>

              <div className="space-y-6 relative z-10">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                    Title
                  </label>
                  <input
                    type="text"
                    value={currentNote.title}
                    onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-white transition-all text-base shadow-sm"
                    placeholder="Enter note title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                    Content
                  </label>
                  <textarea
                    value={currentNote.content}
                    onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-white transition-all text-base resize-none shadow-sm"
                    rows="10"
                    placeholder="Enter note content..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={saveNote}
                    disabled={loading}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                  >
                    {isEditing ? 'Update Note' : 'Save Note'}
                  </button>
                  {isEditing && (
                    <button
                      onClick={cancelEdit}
                      className="px-6 py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-all duration-300 shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notes List */}
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col h-full lg:max-h-[800px]">
              <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="mb-6 relative z-10 flex-shrink-0">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-xl text-purple-600 dark:text-purple-400">📚</span> Your Notes
                    </h2>
                    <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-4 py-1.5 rounded-full text-sm font-bold border border-purple-200 dark:border-purple-800 shadow-sm">
                        {notes.length}
                    </span>
                </div>
                <div className="relative shadow-sm rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 dark:text-white transition-all text-sm backdrop-blur-sm"
                      placeholder="Search your notes..."
                    />
                </div>
              </div>

              <div className="space-y-4 overflow-y-auto pr-3 flex-grow relative z-10 custom-scrollbar">
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
                  </div>
                ) : filteredNotes.length === 0 ? (
                  <div className="text-center py-16 bg-white/30 dark:bg-gray-800/20 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700/50 mt-4">
                    <span className="text-5xl mb-4 block opacity-40">📝</span>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                      {searchTerm ? 'No notes found matching your search.' : 'No notes yet. Create your first note!'}
                    </p>
                  </div>
                ) : (
                  filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      className="group bg-white/60 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6 hover:bg-white dark:hover:bg-gray-800/80 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-purple-200 dark:hover:border-purple-500/40 cursor-pointer"
                      onClick={() => editNote(note)}
                    >
                      <h3 className="font-extrabold text-gray-900 dark:text-white mb-3 text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {note.title || 'Untitled Note'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-5 line-clamp-3 text-sm leading-relaxed font-medium">
                        {note.content}
                      </p>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700/50">
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1.5 uppercase tracking-wider">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {formatDate(note.updated_at || note.updatedAt || note.created_at)}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-800 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100"
                            title="Delete Note"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
