// Placeholder — Feedback board backend (Phase 2: Supabase)
export const dynamic = 'force-dynamic'

export async function GET() {
  return new Response(JSON.stringify([]), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}
