import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Results from '@/components/Results';

export default function InputForm() {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <section>
    <div>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze..."
          className='bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
          />
        <Button className=''type="submit">Analyze</Button>
      </form>
    </div>
    <div className='mt-15'>
      <Results results={results} />
      </div>
      </section>
  );
}
