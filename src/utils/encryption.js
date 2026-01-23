import CryptoJS from 'crypto-js';

// مفتاح التشفير - في الإنتاج، يجب أن يكون فريدًا لكل مستخدم
// يمكن توليده من معرف الجهاز أو جلسة المستخدم
const getEncryptionKey = () => {
    let key = localStorage.getItem('_encryption_key');
    if (!key) {
        // توليد مفتاح عشوائي للمستخدم
        key = CryptoJS.lib.WordArray.random(256 / 8).toString();
        localStorage.setItem('_encryption_key', key);
    }
    return key;
};

/**
 * تشفير البيانات باستخدام AES
 * @param {any} data - البيانات المراد تشفيرها
 * @returns {string} - النص المشفر
 */
export function encryptData(data) {
    try {
        const SECRET_KEY = getEncryptionKey();
        return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    } catch (error) {
        console.error('خطأ في التشفير:', error);
        return null;
    }
}

/**
 * فك تشفير البيانات
 * @param {string} cipherText - النص المشفر
 * @returns {any} - البيانات الأصلية
 */
export function decryptData(cipherText) {
    try {
        if (!cipherText) return null;
        const SECRET_KEY = getEncryptionKey();
        const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData ? JSON.parse(decryptedData) : null;
    } catch (error) {
        console.error('خطأ في فك التشفير:', error);
        return null;
    }
}

/**
 * تشفير وحفظ البيانات في localStorage
 * @param {string} key - مفتاح التخزين
 * @param {any} data - البيانات
 */
export function setEncryptedItem(key, data) {
    const encrypted = encryptData(data);
    if (encrypted) {
        localStorage.setItem(key, encrypted);
    }
}

/**
 * قراءة وفك تشفير البيانات من localStorage
 * @param {string} key - مفتاح التخزين
 * @returns {any} - البيانات المفكوكة
 */
export function getEncryptedItem(key) {
    const encrypted = localStorage.getItem(key);
    return encrypted ? decryptData(encrypted) : null;
}
