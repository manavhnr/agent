import { Toaster } from 'react-hot-toast';
import AgentInterface from '../components/AgentInterface';
import AIChat from './components/AIChat';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">AI Agent Chat</h1>
        <AIChat />
      </div>
    </main>
  );
}
