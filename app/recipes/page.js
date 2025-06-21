import Link from 'next/link';

export const revalidate = 60;

async function fetchRecipes({ query, cuisine, maxReadyTime }) {
  const apiKey = process.env.API_KEY;
  const params = new URLSearchParams();

  if (query) params.append('query', query);
  if (cuisine) params.append('cuisine', cuisine);
  if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);
  params.append('apiKey', apiKey);

  const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch recipes: ${res.status}`);
  }

  const data = await res.json();
  return data.results || [];
}

export default async function RecipesPage({ searchParams }) {
  const query = searchParams.query || '';
  const cuisine = searchParams.cuisine || '';
  const maxReadyTime = searchParams.time || '';

  let recipes = [];
  let error = null;

  try {
    recipes = await fetchRecipes({ query, cuisine, maxReadyTime });
  } catch (e) {
    console.error(e);
    error = e.message;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-blue-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Recipes</h1>

        {error && (
          <p className="text-red-500 mb-4 text-center">Error: {error}</p>
        )}

        {recipes.length === 0 && !error && (
          <p className="text-center">No recipes found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="border border-blue-200 rounded hover:shadow-lg transition"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-2">
                <p className="font-semibold text-center">{recipe.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
