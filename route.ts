import { parseHunt } from "@/lib/parser"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = parseHunt(body.text)

    const { error } = await supabase
      .from("sessions")
      .insert({
        session_date: parsed.sessionDate,
        raw_xp_gain: parsed.rawXpGain,
        xp_gain: parsed.xpGain,
      })

    if (error) {
      return Response.json({
        success: false,
        error: error.message
      })
    }

    return Response.json({
      success: true,
      parsed
    })
  } catch (err: any) {
    return Response.json({
      success: false,
      error: err.message
    })
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .order("id", { ascending: false })

  if (error) {
    return Response.json({
      sessions: []
    })
  }

  return Response.json({
    sessions: data
  })
}