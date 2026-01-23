/**
 * الحد من معدل تنفيذ العمليات (Rate Limiting)
 * يمنع تكرار العمليات بشكل سريع جداً
 */

const rateLimiters = new Map();

/**
 * التحقق من إمكانية تنفيذ عملية
 * @param {string} key - مفتاح العملية (مثل: 'contact-form', 'qr-generate')
 * @param {number} cooldownMs - وقت الانتظار بالميلي ثانية (افتراضي: 3 ثواني)
 * @returns {boolean} - هل يمكن تنفيذ العملية؟
 */
export function canExecute(key, cooldownMs = 3000) {
    const now = Date.now();
    const lastExecution = rateLimiters.get(key);

    if (!lastExecution || now - lastExecution >= cooldownMs) {
        rateLimiters.set(key, now);
        return true;
    }

    return false;
}

/**
 * الحصول على الوقت المتبقي قبل إمكانية التنفيذ مرة أخرى
 * @param {string} key - مفتاح العملية
 * @param {number} cooldownMs - وقت الانتظار
 * @returns {number} - الوقت المتبقي بالميلي ثانية
 */
export function getRemainingCooldown(key, cooldownMs = 3000) {
    const now = Date.now();
    const lastExecution = rateLimiters.get(key);

    if (!lastExecution) return 0;

    const remaining = cooldownMs - (now - lastExecution);
    return remaining > 0 ? remaining : 0;
}

/**
 * إعادة تعيين العداد لعملية معينة
 * @param {string} key - مفتاح العملية
 */
export function resetRateLimit(key) {
    rateLimiters.delete(key);
}

/**
 * مُزخرف (Decorator) للدوال لتطبيق Rate Limiting
 * @param {Function} fn - الدالة المراد تطبيق Rate Limiting عليها
 * @param {string} key - مفتاح فريد للعملية
 * @param {number} cooldownMs - وقت الانتظار
 * @returns {Function} - الدالة المُزخرفة
 */
export function withRateLimit(fn, key, cooldownMs = 3000) {
    return function (...args) {
        if (canExecute(key, cooldownMs)) {
            return fn.apply(this, args);
        } else {
            const remaining = Math.ceil(getRemainingCooldown(key, cooldownMs) / 1000);
            console.warn(`يرجى الانتظار ${remaining} ثانية قبل المحاولة مرة أخرى`);
            return null;
        }
    };
}
