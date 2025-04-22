import { AgentResponse } from '../types/agents';

export abstract class BaseAgent {
  protected name: string;
  protected description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  protected async handleError(error: any): Promise<AgentResponse<any>> {
    return {
      success: false,
      data: null,
      error: error.message || 'An unknown error occurred'
    };
  }

  protected createSuccessResponse<T>(data: T): AgentResponse<T> {
    return {
      success: true,
      data
    };
  }

  abstract execute(input: any): Promise<AgentResponse<any>>;
} 