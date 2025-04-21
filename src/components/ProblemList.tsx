'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Problem {
  id: string;
  title: string;
  description: string;
  importance: number;
  potency: number;
}

interface ProblemListProps {
  problems: Problem[];
  onSelectProblem: (problem: Problem) => void;
}

const ProblemList: React.FC<ProblemListProps> = ({ problems, onSelectProblem }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Researched Problems
      </h2>
      <div className="grid gap-4">
        {problems.map((problem, index) => (
          <motion.div
            key={problem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow transition-colors duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {problem.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{problem.description}</p>
              </div>
              <div className="flex space-x-2">
                <span className="px-2 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                  Importance: {problem.importance}%
                </span>
                <span className="px-2 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                  Potency: {problem.potency}%
                </span>
              </div>
            </div>
            <button
              onClick={() => onSelectProblem(problem)}
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors dark:focus:ring-offset-gray-800"
            >
              Select This Problem
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProblemList; 