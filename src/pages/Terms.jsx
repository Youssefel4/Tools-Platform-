import React from 'react';
import SEO from '../components/SEO';
import {
  LuHandshake, LuWrench, LuSquareCheck, LuCopyright,
  LuUser, LuLock, LuTriangleAlert, LuScale,
  LuShieldCheck, LuDoorOpen, LuGavel, LuFilePen,
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

const Terms = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <SEO
        title="Terms of Service"
        description="Read the Terms of Service for Tools Platform. Understand the rules and guidelines for using our free online tools and utilities."
        keywords="terms of service, terms and conditions, user agreement, legal, terms"
        url="https://platformtools.netlify.app/terms"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#001645] dark:text-white mb-4 tracking-tight">
            Terms of <span className="text-[#804DF2]">Service</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 mb-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">

            <SectionTitle icon={LuHandshake}>Agreement to Terms</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-lg">
              By accessing and using Tools Platform ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>

            <SectionTitle icon={LuWrench}>Description of Service</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Tools Platform provides free web-based tools including but not limited to calculators, note-taking applications, unit converters, text counters, password generators, timers, color pickers, to-do lists, and mini-games. All tools operate locally in your browser.
            </p>

            <SectionTitle icon={LuSquareCheck}>Acceptable Use</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Use the Service for any illegal or unauthorized purpose</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Attempt to gain unauthorized access to our systems</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Interfere with or disrupt the Service or servers</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Use automated tools to access the Service excessively</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Reproduce, duplicate, copy, sell, or exploit any portion of the Service</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Use the Service to transmit malicious code or harmful content</li>
            </ul>

            <SectionTitle icon={LuCopyright}>Intellectual Property</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              The Service and its original content, features, and functionality are owned by Tools Platform and are protected by international copyright, trademark, and other intellectual property laws. You may not modify, reproduce, or distribute our content without explicit permission.
            </p>

            <SectionTitle icon={LuUser}>User-Generated Content</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              While using our tools, you may create content such as notes, to-do lists, or calculations. This content is stored locally in your browser and:
            </p>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Remains your property</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Is not transmitted to our servers (unless submitted via contact form)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>Is your responsibility to backup and maintain</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>May be deleted if you clear your browser data</li>
            </ul>

            <SectionTitle icon={LuLock}>Privacy</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your information.
            </p>

            <SectionTitle icon={LuTriangleAlert}>Disclaimers</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Our Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, including but not limited to:
            </p>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-10 pl-4">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>The accuracy, reliability, or availability of calculations and conversions</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>The security or privacy of locally stored data</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>The fitness of our tools for any particular purpose</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#804DF2] mr-3 flex-shrink-0"></span>The uninterrupted or error-free operation of the Service</li>
            </ul>

            <SectionTitle icon={LuScale}>Limitation of Liability</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              In no event shall Tools Platform, its directors, employees, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or other intangible losses, resulting from your use of the Service.
            </p>

            <SectionTitle icon={LuShieldCheck}>Indemnification</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              You agree to defend, indemnify, and hold harmless Tools Platform and its licensors from and against any claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
            </p>

            <SectionTitle icon={LuDoorOpen}>Termination</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <SectionTitle icon={LuGavel}>Governing Law</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which Tools Platform operates, without regard to conflict of law provisions.
            </p>

            <SectionTitle icon={LuFilePen}>Changes to Terms</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on our website prior to the effective date of the changes.
            </p>

            <SectionTitle icon={LuMail}>Contact Information</SectionTitle>
            <p className="text-slate-600 dark:text-slate-400 mb-6">If you have any questions about these Terms, please contact us:</p>
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 font-mono text-sm border border-slate-200 dark:border-slate-700 shadow-sm mb-10">
              <div className="flex items-center mb-3"><span className="text-slate-400 mr-3">Email:</span> <a href="mailto:yousseflachgar288@gmail.com" className="text-[#804DF2] hover:underline">yousseflachgar288@gmail.com</a></div>
              <div className="flex items-center"><span className="text-slate-400 mr-3">Contact Form:</span> <a href="/contact" className="text-[#804DF2] hover:underline">/contact</a></div>
            </div>

            <div className="p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl flex items-start gap-3">
              <LuTriangleAlert className="text-amber-500 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <p className="text-amber-800 dark:text-amber-300 font-bold mb-1">Important Notice</p>
                <p className="text-amber-700 dark:text-amber-400/80 leading-relaxed text-sm m-0">
                  These tools are provided for general informational and educational purposes only. Always verify important calculations and data through multiple sources, especially for critical applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
