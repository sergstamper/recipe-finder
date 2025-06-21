export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const cuisine = searchParams.get('cuisine') || '';
  const maxReadyTime = searchParams.get('maxReadyTime') || '';

  const apiKey = process.env.API_KEY;
  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (cuisine) params.append('cuisine', cuisine);
  if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);
  params.append('apiKey', apiKey);

  const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;
  const res = await fetch(url);
  const data = await res.json();

  return Response.json(data);
}
