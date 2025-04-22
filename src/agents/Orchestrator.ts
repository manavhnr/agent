import { ResearcherAgent } from './ResearcherAgent';
import { PresentationAgent } from './PresentationAgent';
import { FrontendAgent } from './FrontendAgent';
import { MLAgent } from './MLAgent';
import { BackendAgent } from './BackendAgent';
import { ScriptAgent } from './ScriptAgent';
import { AgentResponse, ResearchResult, FrontendSpec, MLModel, BackendSpec, PresentationData, ScriptData } from '../types/agents';

export class Orchestrator {
  private researcher: ResearcherAgent;
  private presentation: PresentationAgent;
  private frontend: FrontendAgent;
  private ml: MLAgent;
  private backend: BackendAgent;
  private script: ScriptAgent;

  constructor() {
    this.researcher = new ResearcherAgent();
    this.presentation = new PresentationAgent();
    this.frontend = new FrontendAgent();
    this.ml = new MLAgent();
    this.backend = new BackendAgent();
    this.script = new ScriptAgent();
  }

  async execute(stream: string): Promise<{
    research: AgentResponse<ResearchResult>;
    presentation: AgentResponse<PresentationData>;
    frontend: AgentResponse<FrontendSpec>;
    ml: AgentResponse<MLModel | null>;
    backend: AgentResponse<BackendSpec>;
    script: AgentResponse<ScriptData>;
  }> {
    // Step 1: Research
    const researchResponse = await this.researcher.execute({ stream });
    
    if (!researchResponse.success || Array.isArray(researchResponse.data)) {
      throw new Error(`Research failed: ${researchResponse.error}`);
    }

    const research = researchResponse as AgentResponse<ResearchResult>;

    // Step 2: Generate presentation
    const presentation = await this.presentation.execute({ 
      research: research.data 
    });

    // Step 3: Generate frontend spec
    const frontend = await this.frontend.execute({ 
      research: research.data 
    });

    // Step 4: Generate ML model if needed
    const ml = frontend.data.mlRequirements 
      ? await this.ml.execute({ 
          research: research.data,
          frontendSpec: frontend.data
        })
      : { success: true, data: null };

    // Step 5: Generate backend spec
    const backend = await this.backend.execute({
      mlModel: ml.data as MLModel,
      frontendSpec: frontend.data
    });

    // Step 6: Generate script
    const script = await this.script.execute({ 
      research: research.data 
    });

    return {
      research,
      presentation,
      frontend,
      ml,
      backend,
      script
    };
  }
} 