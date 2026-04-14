// Placeholder — Token export API (Phase 2)
export const dynamic = 'force-dynamic'

export async function GET() {
  return new Response(JSON.stringify({ error: 'Use the in-app Export modal instead' }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
