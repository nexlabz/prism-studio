// Placeholder — AI streaming endpoint (Phase 3: Anthropic SDK)
export const dynamic = 'force-dynamic'

export async function POST() {
  return new Response(JSON.stringify({ error: 'AI Studio coming in Pro' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  })
}
