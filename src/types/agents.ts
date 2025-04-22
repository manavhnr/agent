export interface ResearchResult {
  problemStatement: string;
  statistics: any[];
  marketAnalysis: string;
  newsArticles: string[];
  evidences: string[];
}

export interface PresentationData {
  slides: {
    title: string;
    content: string;
    images?: string[];
  }[];
}

export interface FrontendSpec {
  components: string[];
  routes: string[];
  features: string[];
  mlRequirements?: boolean;
}

export interface MLModel {
  type: string;
  code: string;
  dependencies: string[];
  integrationPoints: string[];
}

export interface BackendSpec {
  endpoints: string[];
  database: {
    type: string;
    schema: any;
  };
  authentication: {
    type: string;
    config: any;
  };
}

export interface ScriptData {
  scenes: {
    description: string;
    duration: number;
    visuals: string[];
    narration: string;
  }[];
}

export interface AgentResponse<T> {
  success: boolean;
  data: T;
  error?: string;
} 