import React from 'react';
import {
  LuTarget, LuSparkles, LuCalculator, LuSquareCheck,
  LuArrowLeftRight, LuGamepad2, LuShieldCheck, LuCircleCheckBig,
  LuMail, LuMessageSquare
} from 'react-icons/lu';

import SEO from '../components/SEO';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 sm:py-16 text-slate-900 dark:text-slate-100">
      <SEO
        title="About Us"
        description="Learn about Tools Platform - our mission to provide free, accessible, and powerful web tools. Discover our values, features, and commitment to privacy."
        keywords="about, mission, values, free tools, privacy-first, web tools, online utilities"
        url="https://platformtools.netlify.app/about"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl font-black text-[#001645] dark:text-white mb-4 tracking-tight">
            About <span className="text-[#804DF2]">Tools Platform</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover our mission to provide free, accessible, and powerful web utilities directly in your browser.
          </p>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 mb-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#001645] dark:text-white mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-[#804DF2] dark:text-[#a782f7] flex items-center justify-center">
                <LuTarget size={22} />
              </span>
              Our Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg">
              Tools Platform is dedicated to providing free, accessible, and powerful web tools that help people accomplish their daily tasks more efficiently. We believe that everyone should have access to high-quality productivity tools without the need for complex software installations or subscriptions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#001645] dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-[#804DF2] dark:text-[#a782f7] flex items-center justify-center">
                <LuSparkles size={22} />
              </span>
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 transition-all hover:border-[#804DF2] shadow-sm">
                <h3 className="font-bold text-[#001645] dark:text-white mb-2 flex items-center gap-2.5">
                  <span className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-[#804DF2]">
                    <LuCalculator size={18} />
                  </span>
                  Mathematical Tools
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  From basic calculations to scientific operations, our calculator handles all your mathematical needs.
                </p>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 transition-all hover:border-[#804DF2] shadow-sm">
                <h3 className="font-bold text-[#001645] dark:text-white mb-2 flex items-center gap-2.5">
                  <span className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-[#804DF2]">
                    <LuSquareCheck size={18} />
                  </span>
                  Productivity Tools
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Stay organized with notes, to-do lists, and text analysis tools that boost your productivity.
                </p>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 transition-all hover:border-[#804DF2] shadow-sm">
                <h3 className="font-bold text-[#001645] dark:text-white mb-2 flex items-center gap-2.5">
                  <span className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-[#804DF2]">
                    <LuArrowLeftRight size={18} />
                  </span>
                  Conversion Tools
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Convert between different units of measurement quickly and accurately.
                </p>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 transition-all hover:border-[#804DF2] shadow-sm">
                <h3 className="font-bold text-[#001645] dark:text-white mb-2 flex items-center gap-2.5">
                  <span className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-[#804DF2]">
                    <LuGamepad2 size={18} />
                  </span>
                  Entertainment
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Take a break with our collection of fun mini-games.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#001645] dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-[#804DF2] dark:text-[#a782f7] flex items-center justify-center">
                <LuShieldCheck size={22} />
              </span>
              Our Values
            </h2>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <LuCircleCheckBig size={20} className="text-[#804DF2] shrink-0 mr-3 mt-0.5" />
                <span className="text-base"><strong className="text-slate-900 dark:text-white">Privacy First:</strong> All tools work locally in your browser. No data is sent to our servers.</span>
              </li>
              <li className="flex items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <LuCircleCheckBig size={20} className="text-[#804DF2] shrink-0 mr-3 mt-0.5" />
                <span className="text-base"><strong className="text-slate-900 dark:text-white">Free Forever:</strong> All tools are completely free to use with no hidden costs or premium features.</span>
              </li>
              <li className="flex items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <LuCircleCheckBig size={20} className="text-[#804DF2] shrink-0 mr-3 mt-0.5" />
                <span className="text-base"><strong className="text-slate-900 dark:text-white">Always Available:</strong> No internet connection required after the initial load.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 mb-6 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-black text-[#001645] dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-base sm:text-lg max-w-2xl mx-auto">
            We value your feedback and suggestions! If you have any ideas for new tools or improvements to existing ones, please don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#804DF2] hover:bg-[#6c3bde] text-white rounded-full font-bold shadow-sm transition-all"
            >
              <LuMessageSquare size={18} />
              Contact Form
            </a>
            <a
              href="mailto:Yousseflachgar288@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 font-bold transition-all"
            >
              <LuMail size={18} />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;