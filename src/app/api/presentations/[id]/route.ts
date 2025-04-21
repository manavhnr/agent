import { NextResponse } from 'next/server.js';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Generate presentation content based on the problem ID
    const presentation = {
      title: "Project Presentation",
      problem: {
        id,
        // You would typically fetch these from a database
        title: getProblemTitle(id),
        description: getProblemDescription(id),
      },
      slides: [
        {
          title: "Introduction",
          content: `We're addressing ${getProblemTitle(id)}, a critical challenge in today's world.`,
          notes: "Start with a strong hook about why this problem matters."
        },
        {
          title: "Problem Analysis",
          content: getProblemDescription(id),
          notes: "Present key statistics and real-world examples."
        },
        {
          title: "Our Solution",
          content: "Introducing an innovative approach that leverages cutting-edge technology.",
          notes: "Focus on what makes our solution unique."
        },
        {
          title: "Technical Architecture",
          content: "Built with Next.js, TypeScript, and modern best practices.",
          notes: "Highlight the scalability and maintainability of our solution."
        },
        {
          title: "Demo & Features",
          content: "Live demonstration of key features and user benefits.",
          notes: "Show the most impressive features first."
        },
        {
          title: "Impact & Future",
          content: "Our solution has the potential to help thousands of users.",
          notes: "End with a strong call to action."
        }
      ]
    };

    return NextResponse.json(presentation);
  } catch (error) {
    console.error('Error generating presentation:', error);
    return NextResponse.json(
      { error: 'Failed to generate presentation' },
      { status: 500 }
    );
  }
}

// Helper functions to get problem details
function getProblemTitle(id: string): string {
  const titles: { [key: string]: string } = {
    '1': 'AI-Powered Healthcare Diagnosis',
    '2': 'Personalized Learning Platform',
    '3': 'Sustainable Energy Management',
    '4': 'Digital Accessibility Solutions',
    '5': 'Financial Literacy Platform',
    '6': 'Community Support Network',
    '7': 'AI-Powered Research Assistant',
    '8': 'Smart Task Management System',
  };
  return titles[id] || 'Innovative Solution';
}

function getProblemDescription(id: string): string {
  const descriptions: { [key: string]: string } = {
    '1': 'Developing a machine learning model to assist in early disease detection and diagnosis, improving healthcare accessibility.',
    '2': 'Creating an adaptive learning system that customizes educational content based on individual student needs and learning styles.',
    '3': 'Developing a smart grid system to optimize energy consumption and reduce waste in residential and commercial buildings.',
    '4': 'Building tools to make digital content more accessible for people with disabilities, ensuring equal access to information.',
    '5': 'Creating an interactive platform to improve financial literacy and help people make better financial decisions.',
    '6': 'Developing a platform connecting people in need with volunteers and resources in their local community.',
    '7': 'Creating a tool that helps researchers analyze and synthesize information from multiple sources efficiently.',
    '8': 'Developing an intelligent system that helps users organize and prioritize their tasks based on importance and deadlines.',
  };
  return descriptions[id] || 'An innovative solution to address modern challenges.';
} 