import DOMPurify from 'dompurify';

/**
 * تنقية النصوص من أكواد HTML و JavaScript الخبيثة
 * @param {string} input - النص المدخل
 * @returns {string} - النص المنقى
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return DOMPurify.sanitize(input, {
        ALLOWED_TAGS: [], // لا نسمح بأي HTML tags
        ALLOWED_ATTR: [], // لا نسمح بأي attributes
        KEEP_CONTENT: true // نحتفظ بالمحتوى النصي فقط
    });
}

/**
 * تنقية HTML مع السماح ببعض العناصر الآمنة
 * @param {string} html - كود HTML
 * @returns {string} - HTML المنقى
 */
export function sanitizeHTML(html) {
    if (typeof html !== 'string') return '';
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
        ALLOWED_ATTR: ['href', 'target']
    });
}

/**
 * تنقية عنوان URL
 * @param {string} url - الرابط
 * @returns {string} - الرابط المنقى
 */
export function sanitizeURL(url) {
    if (typeof url !== 'string') return '';
    // نسمح فقط بروابط http و https
    const cleaned = DOMPurify.sanitize(url);
    if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
        return cleaned;
    }
    return '';
}
