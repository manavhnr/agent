'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Step {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface GenerationProgressProps {
  steps: Step[];
}

const GenerationProgress: React.FC<GenerationProgressProps> = ({ steps }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Project Generation Progress
      </h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.status === 'completed'
                  ? 'bg-green-500'
                  : step.status === 'in-progress'
                  ? 'bg-blue-500'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {step.status === 'completed' ? (
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : step.status === 'in-progress' ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="text-gray-500 dark:text-gray-400">{index + 1}</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-gray-900 dark:text-gray-100 font-medium">{step.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {step.status === 'completed'
                  ? 'Completed'
                  : step.status === 'in-progress'
                  ? 'In Progress'
                  : 'Pending'}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GenerationProgress; 