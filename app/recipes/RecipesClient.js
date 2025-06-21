'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RecipesClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const cuisine = searchParams.get('cuisine') || '';
  const maxReadyTime = searchParams.get('time') || '';

  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const params = new URLSearchParams();
        if (query) params.append('query', query);
        if (cuisine) params.append('cuisine', cuisine);
        if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);

        const res = await fetch(`/api/recipes?${params.toString()}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setRecipes(data.results || []);
      } catch (e) {
        setError(e.message);
      }
    }
    
    fetchRecipes();
  }, [query, cuisine, maxReadyTime]);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-blue-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Recipes</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {recipes.length === 0 && !error && (
          <p className="text-center">No recipes found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="block">
              <div className="border rounded hover:shadow-lg transition">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <div className="p-2">
                  <p className="font-semibold text-center">{recipe.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
