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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            About Tools Platform
          </h1>
          <p className="text-gray-600 dark:text-gray-400 px-2">
            Learn more about our mission and the tools we provide
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tools Platform is dedicated to providing free, accessible, and powerful web tools that help people accomplish their daily tasks more efficiently. We believe that everyone should have access to high-quality productivity tools without the need for complex software installations or subscriptions.
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  🧮 Mathematical Tools
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  From basic calculations to scientific operations, our calculator handles all your mathematical needs.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  📝 Productivity Tools
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Stay organized with notes, to-do lists, and text analysis tools that boost your productivity.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  🔄 Conversion Tools
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Convert between different units of measurement quickly and accurately.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  🎮 Entertainment
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Take a break with our collection of fun mini-games.
                </p>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span className="text-sm sm:text-base"><strong>Privacy First:</strong> All tools work locally in your browser. No data is sent to our servers.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>Free Forever:</strong> All tools are completely free to use with no hidden costs or premium features.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>Always Available:</strong> No internet connection required after the initial load.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>User-Friendly:</strong> Clean, intuitive interfaces that anyone can use.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>Regular Updates:</strong> We continuously improve and add new tools based on user feedback.</span>
              </li>
            </ul>


          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
            We value your feedback and suggestions! If you have any ideas for new tools or improvements to existing ones, please don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-center min-h-[44px] flex items-center justify-center"
            >
              Contact Form
            </a>
            <a
              href="mailto:Yousseflachgar288@gmail.com"
              className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-center min-h-[44px] flex items-center justify-center"
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
