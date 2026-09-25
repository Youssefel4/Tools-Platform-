import React, { useState, useEffect } from 'react';
import { LuStickyNote, LuSearch, LuPlus, LuTrash2, LuClock } from 'react-icons/lu';
import ToolLayout from './ToolLayout';
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
          noteData.id = currentNote.id;
        }

        const savedData = await supabaseHelpers.saveNote(noteData);
        if (savedData && savedData[0]) {
          if (isEditing) {
            setNotes(notes.map(n => n.id === currentNote.id ? savedData[0] : n));
          } else {
            setNotes([savedData[0], ...notes]);
          }
        }
      } else {
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
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }

    setCurrentNote({ id: null, title: '', content: '' });
    setIsEditing(false);
  };

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

  const faqs = [
    {
      question: "Are my notes stored privately?",
      answer: "Yes! Notes are encrypted and saved locally in your browser's persistent storage, or synced to the cloud if you are logged in."
    },
    {
      question: "Can I use this note taking app offline?",
      answer: "Yes, the app runs client-side and retains full offline functionality without needing an active connection."
    }
  ];

  const howToUse = [
    { title: "Draft Note", desc: "Type a title and body text into the note editor." },
    { title: "Save & Encrypt", desc: "Click Save Note to persist your draft with client-side encryption." },
    { title: "Filter & Search", desc: "Use the live search field to instantly filter through past notes." }
  ];

  const features = [
    { title: "Encrypted Storage", desc: "Notes are secured with AES encryption in browser memory." },
    { title: "Instant Live Search", desc: "Filter notes across title and content in milliseconds." },
    { title: "No Sign-up Required", desc: "Begin taking notes immediately with zero account registration." }
  ];

  return (
    <ToolLayout
      title="Online Notepad & Private Notes App"
      subtitle="Create, edit, search, and manage quick notes and ideas with encrypted browser storage."
      category="text"
      categoryName="Text & Writing"
      icon={LuStickyNote}
      badge="Productivity"
      seoDescription="Free online notepad and note-taking tool. Write ideas, reminders, and drafts with instant search and encrypted local client-side storage."
      seoKeywords="notes app, online notepad, free notes, private notepad, note taking tool, quick notes, encrypted notes"
      howToUse={howToUse}
      features={features}
      faqs={faqs}
      relatedToolIds={['todo-list', 'text-counter', 'markdown-previewer']}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Form */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>✍️</span> {isEditing ? 'Edit Note' : 'Create New Note'}
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={currentNote.title}
              onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white text-sm font-semibold shadow-sm"
              placeholder="Enter note title..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Content
            </label>
            <textarea
              value={currentNote.content}
              onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white text-sm font-normal resize-none shadow-sm"
              rows={8}
              placeholder="Enter note content..."
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={saveNote}
              disabled={loading}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-all text-sm"
            >
              {isEditing ? 'Update Note' : 'Save Note'}
            </button>
            {isEditing && (
              <button
                onClick={cancelEdit}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>📚</span> Saved Notes ({notes.length})
            </h3>
            <div className="relative w-48">
              <LuSearch className="absolute left-3 top-2.5 text-slate-400" size={14} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-12 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-xs">
                {searchTerm ? 'No notes matched your query.' : 'No notes yet. Create your first note on the left!'}
              </div>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => editNote(note)}
                  className="group p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/60 shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {note.title || 'Untitled Note'}
                    </h4>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                      className="text-slate-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete Note"
                    >
                      <LuTrash2 size={13} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-2">
                    {note.content}
                  </p>
                  <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                    <LuClock size={10} /> {formatDate(note.updated_at || note.updatedAt || note.created_at)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default Notes;
