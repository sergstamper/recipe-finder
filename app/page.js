'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [time, setTime] = useState('');
  const router = useRouter();

  const isFormValid = query || cuisine || time;

  const handleNext = () => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (cuisine) params.append('cuisine', cuisine);
    if (time) params.append('time', time);
    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-blue-50 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Search Recipes</h1>
        <div className="flex flex-col gap-4">
          <label className="sr-only" htmlFor="query">
            Recipe
          </label>
          <input
            id="query"
            type="text"
            placeholder="Enter recipe name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />

          <label className="sr-only" htmlFor="cuisine">
            Cuisine
          </label>
          <select
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
          </select>

          <label className="sr-only" htmlFor="time">
            Max time
          </label>
          <input
            id="time"
            type="number"
            placeholder="Max preparation time (min)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            min="1"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />

          <button
            onClick={handleNext}
            disabled={!isFormValid}
            className={`p-2 rounded-md text-white font-medium ${
              isFormValid
                ? 'bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-300'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
