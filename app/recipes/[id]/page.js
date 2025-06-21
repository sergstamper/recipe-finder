export const revalidate = 60;

async function fetchRecipeDetails(id) {
  const apiKey = process.env.API_KEY;
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to fetch recipe details: ${res.status}`);
  return res.json();
}

export default async function RecipeDetailPage({ params }) {
  const { id } = params;
  let recipe = null;
  let error = null;

  try {
    recipe = await fetchRecipeDetails(id);
  } catch (e) {
    console.error(e);
    error = e.message;
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
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}

        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          {recipe.extendedIngredients.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
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
