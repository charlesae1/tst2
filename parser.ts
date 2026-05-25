export function parseHunt(text: string) {
  const rawMatch = text.match(/Raw XP Gain:\s([\d\.]+)/)
  const xpMatch = text.match(/XP Gain:\s([\d\.]+)/)
  const dateMatch = text.match(/From (\d{4}-\d{2}-\d{2})/)

  const rawXpGain = rawMatch
    ? Number(rawMatch[1].replace(/\./g, ""))
    : 0

  const xpGain = xpMatch
    ? Number(xpMatch[1].replace(/\./g, ""))
    : 0

  const sessionDate = dateMatch
    ? dateMatch[1]
    : new Date().toISOString().split("T")[0]

  return {
    sessionDate,
    rawXpGain,
    xpGain,
  }
}