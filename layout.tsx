export const metadata = {
  title: "Tibia Session Tracker",
  description: "Tracker de hunts Tibia"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body
        style={{
          margin: 0,
          background: "#111",
          color: "white",
          fontFamily: "Arial"
        }}
      >
        {children}
      </body>
    </html>
  )
}