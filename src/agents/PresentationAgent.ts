import { BaseAgent } from './BaseAgent';
import { AgentResponse, PresentationData, ResearchResult } from '../types/agents';

export class PresentationAgent extends BaseAgent {
  constructor() {
    super(
      'Presentation',
      'Creates presentations based on research data'
    );
  }

  async execute(input: { research: ResearchResult }): Promise<AgentResponse<PresentationData>> {
    try {
      const presentation = await this.createPresentation(input.research);
      return this.createSuccessResponse(presentation);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private async createPresentation(research: ResearchResult): Promise<PresentationData> {
    // TODO: Implement Python pptx integration
    // This is a placeholder implementation
    return {
      slides: [
        {
          title: 'Problem Statement',
          content: research.problemStatement,
          images: []
        },
        {
          title: 'Market Analysis',
          content: research.marketAnalysis,
          images: []
        },
        {
          title: 'Statistics',
          content: JSON.stringify(research.statistics),
          images: []
        },
        {
          title: 'Evidence',
          content: research.evidences.join('\n'),
          images: []
        }
      ]
    };
  }
} 