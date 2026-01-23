import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Agreement to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              By accessing and using Tools Platform ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Description of Service
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tools Platform provides free web-based tools including but not limited to calculators, note-taking applications, unit converters, text counters, password generators, timers, color pickers, to-do lists, and mini-games. All tools operate locally in your browser.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Acceptable Use
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use automated tools to access the Service excessively</li>
              <li>Reproduce, duplicate, copy, sell, or exploit any portion of the Service</li>
              <li>Use the Service to transmit malicious code or harmful content</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The Service and its original content, features, and functionality are owned by Tools Platform and are protected by international copyright, trademark, and other intellectual property laws. You may not modify, reproduce, or distribute our content without explicit permission.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              User-Generated Content
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              While using our tools, you may create content such as notes, to-do lists, or calculations. This content is stored locally in your browser and:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
              <li>Remains your property</li>
              <li>Is not transmitted to our servers (unless submitted via contact form)</li>
              <li>Is your responsibility to backup and maintain</li>
              <li>May be deleted if you clear your browser data</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your information.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Disclaimers
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
              <li>The accuracy, reliability, or availability of calculations and conversions</li>
              <li>The security or privacy of locally stored data</li>
              <li>The fitness of our tools for any particular purpose</li>
              <li>The uninterrupted or error-free operation of the Service</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              In no event shall Tools Platform, its directors, employees, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or other intangible losses, resulting from your use of the Service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Indemnification
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You agree to defend, indemnify, and hold harmless Tools Platform and its licensors from and against any claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Termination
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which Tools Platform operates, without regard to conflict of law provisions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on our website prior to the effective date of the changes.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
              <div>Email: yousseflachgar288@gmail.com</div>
              <div>Contact Form: /contact</div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-300 font-semibold">
                Important Notice:
              </p>
              <p className="text-yellow-700 dark:text-yellow-400 text-sm mt-2">
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
