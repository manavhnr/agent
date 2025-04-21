'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import ProjectInput from '@/components/ProjectInput';
import ProblemList from '@/components/ProblemList';
import GenerationProgress from '@/components/GenerationProgress';
import ProjectResult from '@/components/ProjectResult';
import toast from 'react-hot-toast';

export default function Home() {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProject, setGeneratedProject] = useState<any>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleProblemSelect = (problemId: string) => {
    setSelectedProblem(problemId);
    setError(null);
  };

  const handleGenerate = async (projectName: string) => {
    if (!selectedProblem) {
      toast.error('Please select a problem first');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedProject(null);
    setError(null);

    try {
      // Simulate project generation progress
      const progressInterval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 1000);

      // Call the API to generate the project
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemId: selectedProblem,
          projectName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate project');
      }

      const data = await response.json();
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setGeneratedProject(data);
      toast.success('Project generated successfully!');

    } catch (error) {
      console.error('Error generating project:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate project');
      toast.error(error instanceof Error ? error.message : 'Failed to generate project');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setSelectedProblem(null);
    setGeneratedProject(null);
    setGenerationProgress(0);
    setError(null);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Hackathon Automator
            </h1>
            
            <ProjectInput onGenerate={handleGenerate} />
            
            <div className="mt-8">
              <ProblemList
                selectedProblem={selectedProblem}
                onSelect={handleProblemSelect}
              />
            </div>

            {isGenerating && (
              <div className="mt-8">
                <GenerationProgress progress={generationProgress} />
              </div>
            )}

            {error && (
              <div className="mt-8 p-4 bg-red-100 dark:bg-red-900 rounded-lg">
                <p className="text-red-700 dark:text-red-100">{error}</p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            )}

            {generatedProject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <ProjectResult project={generatedProject} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
