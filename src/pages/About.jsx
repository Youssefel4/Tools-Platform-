import React from 'react';
import SEO from '../components/SEO';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8">
      <SEO
        title="About Us"
        description="Learn about Tools Platform - our mission to provide free, accessible, and powerful web tools. Discover our values, features, and commitment to privacy."
        keywords="about, mission, values, free tools, privacy-first, web tools, online utilities"
        url="https://platformtools.netlify.app/about"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            About <span className="text-gradient">Tools Platform</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our mission to provide free, accessible, and powerful web utilities directly in your browser.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 mb-8 sm:mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="prose prose-lg dark:prose-invert max-w-none relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-sm">🎯</span>
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed text-lg">
              Tools Platform is dedicated to providing free, accessible, and powerful web tools that help people accomplish their daily tasks more efficiently. We believe that everyone should have access to high-quality productivity tools without the need for complex software installations or subscriptions.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 flex items-center justify-center text-sm">✨</span>
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-800 rounded-2xl border border-blue-100 dark:border-blue-900/30 transition-transform hover:-translate-y-1 duration-300 shadow-sm">
                <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                  <span className="text-xl">🧮</span> Mathematical Tools
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  From basic calculations to scientific operations, our calculator handles all your mathematical needs.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-white dark:from-green-900/10 dark:to-gray-800 rounded-2xl border border-green-100 dark:border-green-900/30 transition-transform hover:-translate-y-1 duration-300 shadow-sm">
                <h3 className="font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                  <span className="text-xl">📝</span> Productivity Tools
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Stay organized with notes, to-do lists, and text analysis tools that boost your productivity.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/10 dark:to-gray-800 rounded-2xl border border-purple-100 dark:border-purple-900/30 transition-transform hover:-translate-y-1 duration-300 shadow-sm">
                <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-2">
                  <span className="text-xl">🔄</span> Conversion Tools
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Convert between different units of measurement quickly and accurately.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/10 dark:to-gray-800 rounded-2xl border border-yellow-100 dark:border-yellow-900/30 transition-transform hover:-translate-y-1 duration-300 shadow-sm">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
                  <span className="text-xl">🎮</span> Entertainment
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Take a break with our collection of fun mini-games.
                </p>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 flex items-center justify-center text-sm">💎</span>
              Our Values
            </h2>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex items-start p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span className="text-base"><strong className="text-gray-900 dark:text-white">Privacy First:</strong> All tools work locally in your browser. No data is sent to our servers.</span>
              </li>
              <li className="flex items-start p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span className="text-base"><strong className="text-gray-900 dark:text-white">Free Forever:</strong> All tools are completely free to use with no hidden costs or premium features.</span>
              </li>
              <li className="flex items-start p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span className="text-base"><strong className="text-gray-900 dark:text-white">Always Available:</strong> No internet connection required after the initial load.</span>
              </li>
            </ul>

          </div>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 mb-6 sm:mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 dark:from-blue-400/5 dark:to-indigo-400/5"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg relative z-10 max-w-2xl mx-auto">
            We value your feedback and suggestions! If you have any ideas for new tools or improvements to existing ones, please don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <a
              href="/contact"
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 text-center font-medium"
            >
              Contact Form
            </a>
            <a
              href="mailto:Yousseflachgar288@gmail.com"
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-lg transition-all transform hover:-translate-y-1 text-center font-medium"
            >
              Email Us
            </a>
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

export default About;
