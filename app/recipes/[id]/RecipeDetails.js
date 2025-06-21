'use client';

export default function RecipeDetails({ recipe }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">{recipe.title}</h1>

      <p className="text-center mb-4">
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
      <ul className="list-disc list-inside mb-4">
        {recipe.extendedIngredients.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>

      {recipe.summary && (
        <div
          className="prose prose-sm"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />
      )}
    </>
  );
}
