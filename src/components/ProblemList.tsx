'use client';

import { motion } from 'framer-motion';

interface ProblemListProps {
  selectedProblem: string | null;
  onSelect: (problemId: string) => void;
}

const problems = [
  {
    id: '1',
    title: 'AI-Powered Healthcare Diagnosis',
    description: 'Develop a machine learning model to assist in early disease detection and diagnosis, improving healthcare accessibility.',
  },
  {
    id: '2',
    title: 'Personalized Learning Platform',
    description: 'Create an adaptive learning system that customizes educational content based on individual student needs and learning styles.',
  },
  {
    id: '3',
    title: 'Sustainable Energy Management',
    description: 'Develop a smart grid system to optimize energy consumption and reduce waste in residential and commercial buildings.',
  },
  {
    id: '4',
    title: 'Digital Accessibility Solutions',
    description: 'Build tools to make digital content more accessible for people with disabilities, ensuring equal access to information.',
  },
  {
    id: '5',
    title: 'Financial Literacy Platform',
    description: 'Create an interactive platform to improve financial literacy and help people make better financial decisions.',
  },
  {
    id: '6',
    title: 'Community Support Network',
    description: 'Develop a platform connecting people in need with volunteers and resources in their local community.',
  },
];

export default function ProblemList({ selectedProblem, onSelect }: ProblemListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Select a Problem to Solve
      </h2>
      <div className="space-y-4">
        {problems.map((problem) => (
          <motion.div
            key={problem.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedProblem === problem.id
                ? 'bg-blue-100 dark:bg-blue-900'
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => onSelect(problem.id)}
          >
            <h3 className="font-medium text-gray-900 dark:text-white">
              {problem.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {problem.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 