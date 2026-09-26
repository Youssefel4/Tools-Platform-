import React from 'react';
import SEO from '../components/SEO';
import {
  LuShieldCheck, LuChartBar, LuSettings, LuLock,
  LuCookie, LuLink, LuScale, LuBaby, LuFilePen,
  LuMail
} from 'react-icons/lu';

const SectionTitle = ({ icon: Icon, children }) => (
  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-12 flex items-center gap-3 border-t border-slate-100 dark:border-slate-800 pt-8 first:border-t-0 first:mt-0 first:pt-0">
    <span className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-[#804DF2] flex items-center justify-center flex-shrink-0">
      <Icon size={18} />
    </span>
    {children}
  </h2>
);

const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <SEO
        title="Privacy Policy"
        description="Read our Privacy Policy to understand how Tools Platform collects, uses, and protects your data. We prioritize your privacy and data security."
        keywords="privacy policy, data protection, privacy, security, GDPR, data security, user privacy"
        url="https://platformtools.netlify.app/privacy"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#001645] dark:text-white mb-4 tracking-tight">
            Privacy <span className="text-[#804DF2]">Policy</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 mb-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">

            <SectionTitle icon={LuShieldCheck}>Introduction</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-lg">
              At Tools Platform, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and tools.
            </p>

            <SectionTitle icon={LuChartBar}>Information We Collect</SectionTitle>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Information You Provide
            </h3>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-8 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Contact form submissions (name, email, message)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Notes and to-do items you create (stored locally in your browser)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Calculator history and preferences</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Color picker history</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Automatically Collected Information
            </h3>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Browser type and version</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Operating system</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>IP address (anonymized)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Pages visited and time spent</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Referring website</li>
            </ul>

            <SectionTitle icon={LuSettings}>How We Use Your Information</SectionTitle>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>To provide and maintain our tools</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>To respond to your inquiries and support requests</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>To improve our website and user experience</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>To analyze usage patterns and optimize performance</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>To display relevant advertisements</li>
            </ul>

            <SectionTitle icon={LuLock}>Data Storage and Security</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              <strong className="text-slate-900 dark:text-white">Local Storage:</strong> Most of your data is stored locally in your browser using localStorage. This includes:
            </p>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Your notes and to-do lists</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Calculator history</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Color picker preferences</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Dark/light mode settings</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed italic bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              This data never leaves your browser unless you explicitly submit it through our contact form.
            </p>

            <SectionTitle icon={LuCookie}>Cookies and Tracking</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-6">We use cookies and similar technologies to:</p>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Remember your preferences (like dark mode)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Analyze website traffic and usage patterns</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Display personalized advertisements</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Improve website functionality</li>
            </ul>

            <SectionTitle icon={LuLink}>Third-Party Services</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-6">We use the following third-party services:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                <strong className="block text-slate-900 dark:text-white mb-1">Google AdSense</strong>
                <span className="text-slate-600 dark:text-slate-400 text-sm">For displaying advertisements</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                <strong className="block text-slate-900 dark:text-white mb-1">Google Analytics</strong>
                <span className="text-slate-600 dark:text-slate-400 text-sm">For website analytics (anonymized data)</span>
              </div>
            </div>

            <SectionTitle icon={LuScale}>Your Rights</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-6">You have the right to:</p>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Access your contact form submissions</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Request deletion of your data</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Opt out of cookies through browser settings</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Clear your local browser data at any time</li>
            </ul>

            <SectionTitle icon={LuBaby}>Children's Privacy</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
            </p>

            <SectionTitle icon={LuFilePen}>Changes to This Policy</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <SectionTitle icon={LuMail}>Contact Us</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 font-mono text-sm border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center mb-3"><span className="text-slate-400 mr-3">Email:</span> <a href="mailto:yousseflachgar288@gmail.com" className="text-[#804DF2] hover:underline">yousseflachgar288@gmail.com</a></div>
              <div className="flex items-center"><span className="text-slate-400 mr-3">Contact Form:</span> <a href="/contact" className="text-[#804DF2] hover:underline">/contact</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
