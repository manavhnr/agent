import { NextResponse } from 'next/server';
import { Orchestrator } from '../../../agents/Orchestrator';

export async function POST(request: Request) {
  try {
    const { stream } = await request.json();

    if (!stream) {
      return NextResponse.json(
        { error: 'Stream is required' },
        { status: 400 }
      );
    }

    const orchestrator = new Orchestrator();
    const result = await orchestrator.execute(stream);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Agent orchestration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 