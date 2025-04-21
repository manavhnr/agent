'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProjectResultProps {
  problem: {
    title: string;
    description: string;
  };
  presentationUrl?: string;
  projectUrl?: string;
  videoScript?: string;
}

const ProjectResult: React.FC<ProjectResultProps> = ({
  problem,
  presentationUrl,
  projectUrl,
  videoScript,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 transition-colors duration-200"
    >
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Generated Project: {problem.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{problem.description}</p>
      </div>

      <div className="grid gap-4">
        {presentationUrl && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
              Presentation
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              A detailed presentation has been generated for your project.
            </p>
            <a
              href={presentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View Presentation →
            </a>
          </div>
        )}

        {projectUrl && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
              Project Repository
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              The complete project code has been generated and is ready to use.
            </p>
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View Project →
            </a>
          </div>
        )}

        {videoScript && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
              Video Script
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              A script has been generated for your project presentation video.
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-600">
              <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {videoScript}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Start New Project
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectResult; 