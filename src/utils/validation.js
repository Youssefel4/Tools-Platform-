/**
 * التحقق من صحة النص
 * @param {string} input - النص المدخل
 * @param {number} minLength - الحد الأدنى للطول
 * @param {number} maxLength - الحد الأقصى للطول
 * @returns {boolean} - هل النص صالح؟
 */
export function validateText(input, minLength = 1, maxLength = 5000) {
    if (typeof input !== 'string') return false;
    const trimmed = input.trim();
    return trimmed.length >= minLength && trimmed.length <= maxLength;
}

/**
 * التحقق من صحة البريد الإلكتروني
 * @param {string} email - البريد الإلكتروني
 * @returns {boolean} - هل البريد صالح؟
 */
export function validateEmail(email) {
    if (typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

/**
 * التحقق من صحة الرابط (URL)
 * @param {string} url - الرابط
 * @returns {boolean} - هل الرابط صالح؟
 */
export function validateURL(url) {
    if (typeof url !== 'string') return false;
    try {
        const urlObj = new URL(url);
        // نسمح فقط بروابط http و https
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
        return false;
    }
}

/**
 * التحقق من صحة رقم الهاتف (صيغة بسيطة)
 * @param {string} phone - رقم الهاتف
 * @returns {boolean} - هل الرقم صالح؟
 */
export function validatePhone(phone) {
    if (typeof phone !== 'string') return false;
    const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
    return phoneRegex.test(phone);
}

/**
 * التحقق من حجم الملف
 * @param {File} file - الملف
 * @param {number} maxSizeMB - الحد الأقصى بالميجابايت
 * @returns {boolean} - هل الحجم مقبول؟
 */
export function validateFileSize(file, maxSizeMB = 10) {
    if (!file || !file.size) return false;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
}

/**
 * التحقق من نوع الملف
 * @param {File} file - الملف
 * @param {string[]} allowedTypes - الأنواع المسموحة
 * @returns {boolean} - هل النوع مسموح؟
 */
export function validateFileType(file, allowedTypes = []) {
    if (!file || !file.type) return false;
    if (allowedTypes.length === 0) return true;
    return allowedTypes.some(type => {
        if (type.endsWith('/*')) {
            const category = type.split('/')[0];
            return file.type.startsWith(category + '/');
        }
        return file.type === type;
    });
}

/**
 * التحقق من طول كلمة المرور
 * @param {string} password - كلمة المرور
 * @param {number} minLength - الحد الأدنى
 * @returns {boolean} - هل كلمة المرور قوية؟
 */
export function validatePassword(password, minLength = 8) {
    if (typeof password !== 'string') return false;
    return password.length >= minLength;
}

/**
 * التحقق من قوة كلمة المرور
 * @param {string} password - كلمة المرور
 * @returns {object} - تفاصيل القوة
 */
export function checkPasswordStrength(password) {
    const strength = {
        score: 0,
        hasLowerCase: /[a-z]/.test(password),
        hasUpperCase: /[A-Z]/.test(password),
        hasNumbers: /\d/.test(password),
        hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        isLongEnough: password.length >= 8
    };

    if (strength.hasLowerCase) strength.score++;
    if (strength.hasUpperCase) strength.score++;
    if (strength.hasNumbers) strength.score++;
    if (strength.hasSpecialChars) strength.score++;
    if (strength.isLongEnough) strength.score++;

    return strength;
}
