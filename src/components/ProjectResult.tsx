'use client';

import { motion } from 'framer-motion';

interface ProjectResultProps {
  project: {
    title: string;
    description: string;
    presentationUrl: string;
    projectUrl: string;
    videoScript: string;
  };
}

export default function ProjectResult({ project }: ProjectResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        {project.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {project.description}
      </p>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Presentation
          </h3>
          <a
            href={project.presentationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Presentation
          </a>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Project Repository
          </h3>
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Project
          </a>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Video Script
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
              {project.videoScript}
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 