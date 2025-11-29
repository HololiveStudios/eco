import type { APIRoute } from 'astro';
export const POST: APIRoute = async ({ request, locals }) => {
try {
const subscription = await request.json();
// Salvar subscription no banco de dados
// TODO: Implementar salvamento

console.log('[API] Push subscription saved:', subscription);

return new Response(JSON.stringify({ success: true }), {
  status: 200,
  headers: { 'Content-Type': 'application/json' }
});
} catch (error) {
return new Response(JSON.stringify({ error: 'Failed to save subscription' }), {
status: 500,
headers: { 'Content-Type': 'application/json' }
});
}
};