import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 mb-12">
          Empowering Teams, Streamlining Projects
        </p>

        <section className="space-y-10">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✓</span> Goal-Setting & Performance Metrics: Stay aligned with your team’s objectives by tracking progress through customizable performance metrics and data points.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✓</span> Task & Project Management: From planning to execution, manage tasks, timelines, and milestones in one centralized platform.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✓</span> Collaboration Tools: Enhance team communication with shared workspaces, discussions, and file sharing.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✓</span> Real-Time Analytics: Visualize project progress and team performance with dynamic charts and reports.
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <span className="mr-2 text-blue-500">✓</span> User-Friendly Interface: Our intuitive design ensures a smooth experience for users of all levels.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-500">✓</span> Customization: Tailor the platform to your team’s specific needs with flexible tools and workflows.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-500">✓</span> Seamless Integration: Easily connect with the tools you already use to maintain a cohesive workflow.
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-500">✓</span> Security: Your data is safe with us, thanks to enterprise-level security and encryption.
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-600">
              We aim to revolutionize the way teams manage their projects by creating an environment where collaboration, transparency, and progress are always front and center. With [Your Website Name], your team will have the power to turn ideas into action and achieve more, together.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
