import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AgentInterface() {
  const [stream, setStream] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stream }),
      });

      if (!response.ok) {
        throw new Error('Failed to process request');
      }

      const data = await response.json();
      setResult(data);
      toast.success('Agents completed their tasks!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to process request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Hackathon Project Generator</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="stream" className="block text-sm font-medium mb-2">
            Project Stream
          </label>
          <input
            type="text"
            id="stream"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            placeholder="e.g., Healthcare, Education, Environment"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Generate Project'}
        </button>
      </form>

      {result && (
        <div className="space-y-6">
          <section className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Research Results</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(result.research.data, null, 2)}
            </pre>
          </section>

          <section className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Presentation</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(result.presentation.data, null, 2)}
            </pre>
          </section>

          <section className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Frontend Specification</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(result.frontend.data, null, 2)}
            </pre>
          </section>

          {result.ml.data && (
            <section className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Machine Learning Model</h2>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(result.ml.data, null, 2)}
              </pre>
            </section>
          )}

          <section className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Backend Specification</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(result.backend.data, null, 2)}
            </pre>
          </section>

          <section className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Video Script</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(result.script.data, null, 2)}
            </pre>
          </section>
        </div>
      )}
    </div>
  );
} 