export async function GET(req, { params }) {
  const apiKey = process.env.API_KEY;
  const { id } = params;

  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    return Response.json({ error: `Error ${res.status}` }, { status: res.status });
  }

  const data = await res.json();
  return Response.json(data);
}