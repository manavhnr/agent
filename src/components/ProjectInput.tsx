'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectInputProps {
  onSubmit: (prompt: string) => void;
}

const ProjectInput: React.FC<ProjectInputProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Start Your Hackathon Project
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="prompt"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Describe your project idea or requirements
          </label>
          <textarea
            id="prompt"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-200"
            placeholder="Enter your project description, requirements, or any specific topics you want to focus on..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors dark:focus:ring-offset-gray-800"
        >
          Generate Project
        </button>
      </form>
    </motion.div>
  );
};

export default ProjectInput; 