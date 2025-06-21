'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RecipeDetailClient() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setRecipe(data);
      } catch (e) {
        setError(e.message);
      }
    }
    if (id) fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-blue-50 p-4">
        <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-50 p-4">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">{recipe.title}</h1>

        <p className="text-center mb-4 text-gray-600">
          <strong>Ready in:</strong> {recipe.readyInMinutes} min |
          <strong> Servings:</strong> {recipe.servings}
        </p>

        {recipe.image && (
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={600}
            height={400}
            className="w-full h-64 object-cover rounded mb-4"
            priority
          />
        )}

        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          {recipe.extendedIngredients.map((ing, index) => (
            <li key={`${ing.id}-${index}`}>{ing.original}</li>
          ))}
        </ul>

        {recipe.summary && (
          <div
            className="prose prose-sm max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />
        )}
      </div>
    </main>
  );
}
