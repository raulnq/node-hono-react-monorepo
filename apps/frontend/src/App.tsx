import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/hello')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        setMessage(data.message);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="container">
      <h1>Node Monorepo</h1>
      {error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <p className="message">{message}</p>
      )}
    </div>
  );
}

export default App;
