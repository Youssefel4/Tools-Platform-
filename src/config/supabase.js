// LocalStorage Adapter with Encryption
// Replaces Supabase functionality with secure local persistence

import { encryptData, decryptData } from '../utils/encryption';

const STORAGE_KEYS = {
    NOTES: 'tools_notes',
    TODOS: 'tools_todos',
    CONTACT_SUBMISSIONS: 'tools_contact',
    USER_PREFERENCES: 'tools_preferences',
    SHORTENED_URLS: 'tools_short_urls',
    QR_CODES: 'tools_qr_codes',
    FILE_CONVERSIONS: 'tools_file_conversions'
};

// Helper to simulate async behavior of Supabase
const mockAsync = (data) => new Promise((resolve) => setTimeout(() => resolve({ data, error: null }), 100));
const mockError = (msg) => new Promise((resolve) => setTimeout(() => resolve({ data: null, error: { message: msg } }), 100));

// Temporary "User" for local mode
export const supabase = {
    auth: {
        getSession: async () => ({ data: { session: { user: { id: 'local-user' } } } }),
        signInAnonymously: async () => ({ data: { session: { user: { id: 'local-user' } } } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
    },
    // Mock other used methods to prevent crashes if called directly
    from: () => ({
        select: () => ({ eq: () => ({ single: () => mockAsync(null) }) })
    })
};

export const TABLES = STORAGE_KEYS;

// Database Helpers with Encryption
export const supabaseHelpers = {
    // --- Generic Helpers with Encryption ---
    _getItems(key) {
        try {
            const encrypted = localStorage.getItem(key);
            if (!encrypted) return [];
            const decrypted = decryptData(encrypted);
            return decrypted || [];
        } catch {
            return [];
        }
    },

    _saveItems(key, items) {
        try {
            const encrypted = encryptData(items);
            if (encrypted) {
                localStorage.setItem(key, encrypted);
            }
        } catch (error) {
            console.error('خطأ في حفظ البيانات:', error);
        }
    },

    // --- Notes ---
    async getNotes(userId) {
        return mockAsync(this._getItems(STORAGE_KEYS.NOTES)).then(res => res.data);
    },

    async saveNote(note) {
        const notes = this._getItems(STORAGE_KEYS.NOTES);
        const existingIndex = notes.findIndex(n => n.id === note.id);

        if (existingIndex >= 0) {
            notes[existingIndex] = { ...note, updatedAt: new Date().toISOString() };
        } else {
            const newNote = {
                ...note,
                id: note.id || Date.now(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            notes.unshift(newNote);
        }

        this._saveItems(STORAGE_KEYS.NOTES, notes);
        return mockAsync([notes.find(n => n.id === note.id || n.id === Date.now())]).then(res => res.data);
    },

    async deleteNote(noteId) {
        const notes = this._getItems(STORAGE_KEYS.NOTES);
        const filtered = notes.filter(n => n.id !== noteId);
        this._saveItems(STORAGE_KEYS.NOTES, filtered);
        return mockAsync(null);
    },

    // --- Todos ---
    async getTodos(userId) {
        return mockAsync(this._getItems(STORAGE_KEYS.TODOS)).then(res => res.data);
    },

    async saveTodo(todo) {
        const todos = this._getItems(STORAGE_KEYS.TODOS);
        const existingIndex = todos.findIndex(t => t.id === todo.id);

        if (existingIndex >= 0) {
            todos[existingIndex] = { ...todo, updatedAt: new Date().toISOString() };
        } else {
            const newTodo = {
                ...todo,
                id: todo.id || Date.now(),
                createdAt: new Date().toISOString()
            };
            todos.unshift(newTodo);
        }

        this._saveItems(STORAGE_KEYS.TODOS, todos);
        return mockAsync([todos.find(t => t.id === todo.id || t.id === Date.now())]).then(res => res.data);
    },

    async deleteTodo(todoId) {
        const todos = this._getItems(STORAGE_KEYS.TODOS);
        const filtered = todos.filter(t => t.id !== todoId);
        this._saveItems(STORAGE_KEYS.TODOS, filtered);
        return mockAsync(null);
    },

    // --- Contact Submissions ---
    async saveContactSubmission(submission) {
        const submissions = this._getItems(STORAGE_KEYS.CONTACT_SUBMISSIONS);
        const newSubmission = {
            ...submission,
            id: Date.now(),
            createdAt: new Date().toISOString()
        };
        submissions.unshift(newSubmission);
        this._saveItems(STORAGE_KEYS.CONTACT_SUBMISSIONS, submissions);
        return mockAsync([newSubmission]).then(res => res.data);
    },

    async getContactSubmissions() {
        return mockAsync(this._getItems(STORAGE_KEYS.CONTACT_SUBMISSIONS)).then(res => res.data);
    },

    // --- URL Shortener ---
    async saveShortUrl(urlData) {
        const urls = this._getItems(STORAGE_KEYS.SHORTENED_URLS);
        const newUrl = {
            ...urlData,
            id: Date.now(),
            createdAt: new Date().toISOString()
        };
        urls.unshift(newUrl);
        this._saveItems(STORAGE_KEYS.SHORTENED_URLS, urls);
        return mockAsync([newUrl]).then(res => res.data);
    },

    async getShortUrls(userId) {
        return mockAsync(this._getItems(STORAGE_KEYS.SHORTENED_URLS)).then(res => res.data);
    },

    async deleteShortUrl(urlId) {
        const urls = this._getItems(STORAGE_KEYS.SHORTENED_URLS);
        const filtered = urls.filter(u => u.id !== urlId);
        this._saveItems(STORAGE_KEYS.SHORTENED_URLS, filtered);
        return mockAsync(null);
    },

    // --- QR Codes ---
    async saveQRCode(qrData) {
        const qrCodes = this._getItems(STORAGE_KEYS.QR_CODES);
        const newQR = {
            ...qrData,
            id: Date.now(),
            createdAt: new Date().toISOString()
        };
        qrCodes.unshift(newQR);
        this._saveItems(STORAGE_KEYS.QR_CODES, qrCodes);
        return mockAsync([newQR]).then(res => res.data);
    },

    async getQRCodes(userId) {
        return mockAsync(this._getItems(STORAGE_KEYS.QR_CODES)).then(res => res.data);
    },

    async deleteQRCode(qrId) {
        const qrCodes = this._getItems(STORAGE_KEYS.QR_CODES);
        const filtered = qrCodes.filter(q => q.id !== qrId);
        this._saveItems(STORAGE_KEYS.QR_CODES, filtered);
        return mockAsync(null);
    }
};
