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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              At Tools Platform, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and tools.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Information You Provide
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
              <li>Contact form submissions (name, email, message)</li>
              <li>Notes and to-do items you create (stored locally in your browser)</li>
              <li>Calculator history and preferences</li>
              <li>Color picker history</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Automatically Collected Information
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address (anonymized)</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
              <li>To provide and maintain our tools</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To improve our website and user experience</li>
              <li>To analyze usage patterns and optimize performance</li>
              <li>To display relevant advertisements</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Data Storage and Security
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Local Storage:</strong> Most of your data is stored locally in your browser using localStorage. This includes:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
              <li>Your notes and to-do lists</li>
              <li>Calculator history</li>
              <li>Color picker preferences</li>
              <li>Dark/light mode settings</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This data never leaves your browser unless you explicitly submit it through our contact form.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
              <li>Remember your preferences (like dark mode)</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Display personalized advertisements</li>
              <li>Improve website functionality</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Third-Party Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
              <li><strong>Google AdSense:</strong> For displaying advertisements</li>
              <li><strong>Google Analytics:</strong> For website analytics (anonymized data)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
              <li>Access your contact form submissions</li>
              <li>Request deletion of your data</li>
              <li>Opt out of cookies through browser settings</li>
              <li>Clear your local browser data at any time</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
              <div>Email: yousseflachgar288@gmail.com</div>
              <div>Contact Form: /contact</div>
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
