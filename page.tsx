"use client"

import { useEffect, useState } from "react"

type Session = {
  id: number
  session_date: string
  raw_xp_gain: number
  xp_gain: number
}

export default function Home() {
  const [text, setText] = useState("")
  const [sessions, setSessions] = useState<Session[]>([])

  async function loadSessions() {
    const response = await fetch("/api/save-session")
    const data = await response.json()
    setSessions(data.sessions || [])
  }

  useEffect(() => {
    loadSessions()
  }, [])

  async function save() {
    if (!text.trim()) return

    const response = await fetch("/api/save-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text }),
    })

    const data = await response.json()

    if (!data.success) {
      alert(data.error)
      return
    }

    alert("Sessão salva!")

    setText("")
    loadSessions()
  }

  const totalRaw = sessions.reduce((a, b) => a + b.raw_xp_gain, 0)
  const totalXp = sessions.reduce((a, b) => a + b.xp_gain, 0)

  return (
    <main style={{ padding: 30, maxWidth: 1200, margin: "0 auto" }}>
      <h1>Tibia Session Tracker</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginTop: 20
        }}
      >
        <div
          style={{
            background: "#1f1f1f",
            padding: 20,
            borderRadius: 10
          }}
        >
          <h2>RAW XP TOTAL</h2>
          <h1>{totalRaw.toLocaleString("pt-BR")}</h1>
        </div>

        <div
          style={{
            background: "#1f1f1f",
            padding: 20,
            borderRadius: 10
          }}
        >
          <h2>XP TOTAL</h2>
          <h1>{totalXp.toLocaleString("pt-BR")}</h1>
        </div>
      </div>

      <textarea
        style={{
          width: "100%",
          height: 300,
          marginTop: 30,
          background: "#1f1f1f",
          color: "white",
          border: "1px solid #333",
          borderRadius: 10,
          padding: 15
        }}
        placeholder="Cole o hunting analyser aqui"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={save}
        style={{
          marginTop: 20,
          padding: "14px 24px",
          background: "#16a34a",
          border: 0,
          borderRadius: 8,
          color: "white",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Salvar Sessão
      </button>

      <div style={{ marginTop: 40 }}>
        <h2>Histórico</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 20
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 10 }}>Data</th>
              <th style={{ textAlign: "left", padding: 10 }}>RAW XP</th>
              <th style={{ textAlign: "left", padding: 10 }}>XP</th>
            </tr>
          </thead>

          <tbody>
            {sessions.map((session) => (
              <tr key={session.id}>
                <td style={{ padding: 10 }}>
                  {session.session_date}
                </td>

                <td style={{ padding: 10 }}>
                  {session.raw_xp_gain.toLocaleString("pt-BR")}
                </td>

                <td style={{ padding: 10 }}>
                  {session.xp_gain.toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}