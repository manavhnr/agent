'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProjectInput from '@/components/ProjectInput';
import ProblemList from '@/components/ProblemList';
import GenerationProgress from '@/components/GenerationProgress';
import ProjectResult from '@/components/ProjectResult';
import toast from 'react-hot-toast';

interface Problem {
  id: string;
  title: string;
  description: string;
  importance: number;
  potency: number;
}

interface Step {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
}

const generateProblems = (prompt: string): Problem[] => {
  // Extract keywords from the prompt
  const keywords = prompt.toLowerCase().split(' ').filter(word => word.length > 3);
  
  // Define problem categories based on keywords
  const categories = {
    healthcare: ['health', 'medical', 'doctor', 'patient', 'disease', 'hospital'],
    education: ['education', 'learn', 'school', 'student', 'teacher', 'class'],
    environment: ['environment', 'climate', 'sustainable', 'green', 'energy', 'waste'],
    technology: ['tech', 'software', 'app', 'digital', 'internet', 'data'],
    finance: ['finance', 'money', 'bank', 'payment', 'investment', 'budget'],
    social: ['social', 'community', 'people', 'society', 'welfare', 'help']
  };

  // Find relevant categories
  const relevantCategories = Object.entries(categories)
    .filter(([_, keywords]) => keywords.some(k => prompt.toLowerCase().includes(k)))
    .map(([category]) => category);

  // Generate problems based on relevant categories
  const problems: Problem[] = [];
  
  if (relevantCategories.includes('healthcare')) {
    problems.push({
      id: '1',
      title: 'AI-Powered Healthcare Diagnosis',
      description: 'Develop a machine learning model to assist in early disease detection and diagnosis, improving healthcare accessibility.',
      importance: 95,
      potency: 90,
    });
  }
  
  if (relevantCategories.includes('education')) {
    problems.push({
      id: '2',
      title: 'Personalized Learning Platform',
      description: 'Create an adaptive learning system that customizes educational content based on individual student needs and learning styles.',
      importance: 92,
      potency: 88,
    });
  }
  
  if (relevantCategories.includes('environment')) {
    problems.push({
      id: '3',
      title: 'Sustainable Energy Management',
      description: 'Develop a smart grid system to optimize energy consumption and reduce waste in residential and commercial buildings.',
      importance: 94,
      potency: 89,
    });
  }
  
  if (relevantCategories.includes('technology')) {
    problems.push({
      id: '4',
      title: 'Digital Accessibility Solutions',
      description: 'Build tools to make digital content more accessible for people with disabilities, ensuring equal access to information.',
      importance: 90,
      potency: 85,
    });
  }
  
  if (relevantCategories.includes('finance')) {
    problems.push({
      id: '5',
      title: 'Financial Literacy Platform',
      description: 'Create an interactive platform to improve financial literacy and help people make better financial decisions.',
      importance: 88,
      potency: 87,
    });
  }
  
  if (relevantCategories.includes('social')) {
    problems.push({
      id: '6',
      title: 'Community Support Network',
      description: 'Develop a platform connecting people in need with volunteers and resources in their local community.',
      importance: 93,
      potency: 86,
    });
  }

  // If no specific categories match, generate general problems based on keywords
  if (problems.length === 0) {
    problems.push(
      {
        id: '7',
        title: 'AI-Powered Research Assistant',
        description: 'Create a tool that helps researchers analyze and synthesize information from multiple sources efficiently.',
        importance: 91,
        potency: 88,
      },
      {
        id: '8',
        title: 'Smart Task Management System',
        description: 'Develop an intelligent system that helps users organize and prioritize their tasks based on importance and deadlines.',
        importance: 89,
        potency: 87,
      }
    );
  }

  // Sort problems by importance and potency
  return problems.sort((a, b) => {
    const scoreA = (a.importance + a.potency) / 2;
    const scoreB = (b.importance + b.potency) / 2;
    return scoreB - scoreA;
  });
};

export default function Home() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [steps, setSteps] = useState<Step[]>([
    { id: '1', name: 'Research Agent', status: 'pending' },
    { id: '2', name: 'Presentation Agent', status: 'pending' },
    { id: '3', name: 'ML Agent', status: 'pending' },
    { id: '4', name: 'Frontend Agent', status: 'pending' },
    { id: '5', name: 'Backend Agent', status: 'pending' },
    { id: '6', name: 'Code Agent', status: 'pending' },
    { id: '7', name: 'Reviewer Agent', status: 'pending' },
    { id: '8', name: 'Script Agent', status: 'pending' },
  ]);
  const [projectResult, setProjectResult] = useState<{
    presentationUrl?: string;
    projectUrl?: string;
    videoScript?: string;
  } | null>(null);

  const handleProjectSubmit = async (prompt: string) => {
    try {
      setProjectResult(null);
      setSelectedProblem(null);
      setProblems([]);
      
      // Update Research Agent status
      setSteps((prev) =>
        prev.map((step) =>
          step.id === '1' ? { ...step, status: 'in-progress' } : step
        )
      );

      // Simulate API call to research agent
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate problems based on the prompt
      const generatedProblems = generateProblems(prompt);
      setProblems(generatedProblems);
      
      setSteps((prev) =>
        prev.map((step) =>
          step.id === '1' ? { ...step, status: 'completed' } : step
        )
      );

      toast.success('Research completed! Please select a problem to proceed.');
    } catch (error) {
      toast.error('Failed to process your request. Please try again.');
    }
  };

  const handleProblemSelect = async (problem: Problem) => {
    setSelectedProblem(problem);
    toast.success(`Selected: ${problem.title}`);

    // Update remaining steps
    for (let i = 2; i <= 8; i++) {
      setSteps((prev) =>
        prev.map((step) =>
          step.id === i.toString() ? { ...step, status: 'in-progress' } : step
        )
      );

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSteps((prev) =>
        prev.map((step) =>
          step.id === i.toString() ? { ...step, status: 'completed' } : step
        )
      );
    }

    // Generate project result
    setProjectResult({
      presentationUrl: `/presentations/${problem.id}.pdf`,
      projectUrl: `/projects/${problem.id}`,
      videoScript: `Video Script for ${problem.title}:

1. Introduction (30 seconds)
- Introduce the problem: ${problem.description}
- Explain why this problem is important
- State the solution we're proposing

2. Solution Overview (1 minute)
- Present the main features of our solution
- Show how it addresses the problem
- Highlight key technical aspects

3. Technical Implementation (1 minute)
- Explain the architecture
- Show key code snippets
- Demonstrate the working prototype

4. Impact and Future (30 seconds)
- Discuss potential impact
- Outline future improvements
- Call to action for users

Remember to:
- Speak clearly and confidently
- Use visual aids effectively
- Maintain good posture and eye contact
- Keep within the 3-minute time limit`,
    });

    toast.success('Project generation completed!');
  };

  return (
    <Layout>
      <div className="space-y-8">
        {!selectedProblem && <ProjectInput onSubmit={handleProjectSubmit} />}
        
        {problems.length > 0 && !selectedProblem && (
          <ProblemList problems={problems} onSelectProblem={handleProblemSelect} />
        )}

        {selectedProblem && !projectResult && <GenerationProgress steps={steps} />}

        {selectedProblem && projectResult && (
          <ProjectResult
            problem={selectedProblem}
            {...projectResult}
          />
        )}
      </div>
    </Layout>
  );
}
