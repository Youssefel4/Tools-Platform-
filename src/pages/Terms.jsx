import React from 'react';
import SEO from '../components/SEO';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SEO
        title="Terms of Service"
        description="Read the Terms of Service for Tools Platform. Understand the rules and guidelines for using our free online tools and utilities."
        keywords="terms of service, terms and conditions, user agreement, legal, terms"
        url="https://platformtools.netlify.app/terms"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-sm">🤝</span>
              Agreement to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed text-lg">
              By accessing and using Tools Platform ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 flex items-center justify-center text-sm">🛠️</span>
              Description of Service
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Tools Platform provides free web-based tools including but not limited to calculators, note-taking applications, unit converters, text counters, password generators, timers, color pickers, to-do lists, and mini-games. All tools operate locally in your browser.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 flex items-center justify-center text-sm">✅</span>
              Acceptable Use
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-3"></span>Use the Service for any illegal or unauthorized purpose</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-3"></span>Attempt to gain unauthorized access to our systems</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-3"></span>Interfere with or disrupt the Service or servers</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-3"></span>Use automated tools to access the Service excessively</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-3"></span>Reproduce, duplicate, copy, sell, or exploit any portion of the Service</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-3"></span>Use the Service to transmit malicious code or harmful content</li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center text-sm">©️</span>
              Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              The Service and its original content, features, and functionality are owned by Tools Platform and are protected by international copyright, trademark, and other intellectual property laws. You may not modify, reproduce, or distribute our content without explicit permission.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 flex items-center justify-center text-sm">👤</span>
              User-Generated Content
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              While using our tools, you may create content such as notes, to-do lists, or calculations. This content is stored locally in your browser and:
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-3"></span>Remains your property</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-3"></span>Is not transmitted to our servers (unless submitted via contact form)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-3"></span>Is your responsibility to backup and maintain</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-3"></span>May be deleted if you clear your browser data</li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 flex items-center justify-center text-sm">🔒</span>
              Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your information.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 flex items-center justify-center text-sm">⚠️</span>
              Disclaimers
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, including but not limited to:
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-3"></span>The accuracy, reliability, or availability of calculations and conversions</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-3"></span>The security or privacy of locally stored data</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-3"></span>The fitness of our tools for any particular purpose</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-3"></span>The uninterrupted or error-free operation of the Service</li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 flex items-center justify-center text-sm">⚖️</span>
              Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              In no event shall Tools Platform, its directors, employees, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or other intangible losses, resulting from your use of the Service.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-sm">🛡️</span>
              Indemnification
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              You agree to defend, indemnify, and hold harmless Tools Platform and its licensors from and against any claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-300 flex items-center justify-center text-sm">🚪</span>
              Termination
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300 flex items-center justify-center text-sm">🏛️</span>
              Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which Tools Platform operates, without regard to conflict of law provisions.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-sm">📝</span>
              Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on our website prior to the effective date of the changes.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-sm">📧</span>
              Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 font-mono text-sm border border-gray-200 dark:border-gray-700 shadow-sm mb-10">
              <div className="flex items-center mb-3"><span className="text-gray-400 mr-3">Email:</span> <a href="mailto:yousseflachgar288@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">yousseflachgar288@gmail.com</a></div>
              <div className="flex items-center"><span className="text-gray-400 mr-3">Contact Form:</span> <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">/contact</a></div>
            </div>

            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-2xl">
              <p className="text-yellow-800 dark:text-yellow-300 font-bold flex items-center gap-2 mb-2">
                <span className="text-xl">⚠️</span> Important Notice:
              </p>
              <p className="text-yellow-700 dark:text-yellow-400/80 leading-relaxed m-0">
                These tools are provided for general informational and educational purposes only. Always verify important calculations and data through multiple sources, especially for critical applications.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ins className="adsbygoogle"
               style={{ display: 'block', width: '100%', height: '250px' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
    </div>
  );
};

export default Terms;
