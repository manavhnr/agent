import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { problemId, projectName } = await request.json();

    // Generate project content based on the problem ID
    const project = {
      title: projectName,
      description: getProblemDescription(problemId),
      presentationUrl: `/api/presentations/${problemId}`,
      projectUrl: `/api/projects/${problemId}`,
      videoScript: generateVideoScript(projectName, problemId),
    };

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error generating project:', error);
    return NextResponse.json(
      { error: 'Failed to generate project' },
      { status: 500 }
    );
  }
}

function getProblemDescription(id: string): string {
  const descriptions: { [key: string]: string } = {
    '1': 'An AI-powered healthcare diagnosis system that uses machine learning to assist in early disease detection and improve healthcare accessibility.',
    '2': 'A personalized learning platform that adapts educational content based on individual student needs and learning styles.',
    '3': 'A smart grid system for optimizing energy consumption and reducing waste in residential and commercial buildings.',
    '4': 'A suite of tools designed to make digital content more accessible for people with disabilities.',
    '5': 'An interactive platform focused on improving financial literacy and helping people make better financial decisions.',
    '6': 'A community platform connecting people in need with volunteers and local resources.',
  };
  return descriptions[id] || 'An innovative solution to address modern challenges.';
}

function generateVideoScript(projectName: string, problemId: string): string {
  const description = getProblemDescription(problemId);
  
  return `Video Script for ${projectName}

1. Introduction (30 seconds)
- Welcome to ${projectName}
- Problem Statement: ${description}
- Why this matters to our audience

2. Solution Overview (1 minute)
- Key Features and Benefits
- Technology Stack: Next.js, React, TypeScript
- User Experience Focus

3. Technical Deep Dive (1 minute)
- Architecture Overview
- Key Implementation Details
- Security and Scalability

4. Demo (30 seconds)
- Live Walkthrough
- Key User Flows
- Feature Highlights

5. Impact & Future (30 seconds)
- Current Impact Metrics
- Future Development Plans
- Call to Action

Remember to:
- Maintain eye contact
- Speak clearly and confidently
- Use visual aids effectively
- Stay within the 3-minute limit`;
} 