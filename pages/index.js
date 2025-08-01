import { useState } from 'react'

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword })
    });
    const data = await res.json();
    const names = data.names.split('\n').filter(line => line.trim() !== '');
    setResults(names);
    setLoading(false);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>🚀 Web3 Brand Name Generator</h1>
      <input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Enter your idea (e.g., 'forest')"
        style={{ fontSize: 18, padding: 10, width: '300px' }}
      />
      <button onClick={handleGenerate} style={{ marginLeft: 10, padding: 10 }}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      <ul style={{ marginTop: 30 }}>
        {results.map((name, i) => <li key={i}>{name}</li>)}
      </ul>
    </main>
  );
}
