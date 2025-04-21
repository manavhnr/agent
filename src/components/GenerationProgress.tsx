'use client';

import { motion } from 'framer-motion';

interface GenerationProgressProps {
  progress: number;
}

export default function GenerationProgress({ progress }: GenerationProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Generating Project
      </h2>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
        <motion.div
          className="bg-blue-600 dark:bg-blue-500 h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-right">
        {progress}%
      </p>
    </motion.div>
  );
} 