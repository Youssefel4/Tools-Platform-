import React from 'react';
import SEO from '../components/SEO';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SEO
        title="Privacy Policy"
        description="Read our Privacy Policy to understand how Tools Platform collects, uses, and protects your data. We prioritize your privacy and data security."
        keywords="privacy policy, data protection, privacy, security, GDPR, data security, user privacy"
        url="https://platformtools.netlify.app/privacy"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Privacy <span className="text-gradient">Policy</span>
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
              <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-sm">🛡️</span>
              Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed text-lg">
              At Tools Platform, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and tools.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 flex items-center justify-center text-sm">📊</span>
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Information You Provide
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-8 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></span>Contact form submissions (name, email, message)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></span>Notes and to-do items you create (stored locally in your browser)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></span>Calculator history and preferences</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></span>Color picker history</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Automatically Collected Information
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-3"></span>Browser type and version</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-3"></span>Operating system</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-3"></span>IP address (anonymized)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-3"></span>Pages visited and time spent</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-3"></span>Referring website</li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 flex items-center justify-center text-sm">⚙️</span>
              How We Use Your Information
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-3"></span>To provide and maintain our tools</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-3"></span>To respond to your inquiries and support requests</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-3"></span>To improve our website and user experience</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-3"></span>To analyze usage patterns and optimize performance</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-3"></span>To display relevant advertisements</li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 flex items-center justify-center text-sm">🔒</span>
              Data Storage and Security
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Local Storage:</strong> Most of your data is stored locally in your browser using localStorage. This includes:
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-6 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-3"></span>Your notes and to-do lists</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-3"></span>Calculator history</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-3"></span>Color picker preferences</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-3"></span>Dark/light mode settings</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed italic bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              This data never leaves your browser unless you explicitly submit it through our contact form.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 flex items-center justify-center text-sm">🍪</span>
              Cookies and Tracking
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We use cookies and similar technologies to:
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-3"></span>Remember your preferences (like dark mode)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-3"></span>Analyze website traffic and usage patterns</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-3"></span>Display personalized advertisements</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-3"></span>Improve website functionality</li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-sm">🔗</span>
              Third-Party Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We use the following third-party services:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
                <strong className="block text-gray-900 dark:text-white mb-1">Google AdSense</strong>
                <span className="text-gray-600 dark:text-gray-400 text-sm">For displaying advertisements</span>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
                <strong className="block text-gray-900 dark:text-white mb-1">Google Analytics</strong>
                <span className="text-gray-600 dark:text-gray-400 text-sm">For website analytics (anonymized data)</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 flex items-center justify-center text-sm">⚖️</span>
              Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You have the right to:
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-3"></span>Access your contact form submissions</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-3"></span>Request deletion of your data</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-3"></span>Opt out of cookies through browser settings</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-3"></span>Clear your local browser data at any time</li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 flex items-center justify-center text-sm">👶</span>
              Children's Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300 flex items-center justify-center text-sm">📝</span>
              Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-8">
              <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-sm">📧</span>
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 font-mono text-sm border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center mb-3"><span className="text-gray-400 mr-3">Email:</span> <a href="mailto:yousseflachgar288@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">yousseflachgar288@gmail.com</a></div>
              <div className="flex items-center"><span className="text-gray-400 mr-3">Contact Form:</span> <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">/contact</a></div>
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

export default Privacy;
