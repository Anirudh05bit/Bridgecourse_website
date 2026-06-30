import { useState } from "react"

const ADMIN_PASSWORD = "your-actual-password-here"

export default function ProtectedRoute({
  children,
  onDeny,
}: {
  children: React.ReactNode
  onDeny: () => void
}) {
  const [authed, setAuthed] = useState(sessionStorage.getItem("admin_ok") === "true")
  const [input, setInput] = useState("")
  const [attempts, setAttempts] = useState(0)

  if (authed) return <>{children}</>

  const tryLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_ok", "true")
      setAuthed(true)
    } else {
      const next = attempts + 1
      setAttempts(next)
      if (next >= 3) {
        onDeny() // kick back to home after 3 wrong tries
      } else {
        alert("Wrong password")
      }
    }
  }

  return (
    <form onSubmit={tryLogin} style={{ padding: "2rem" }}>
      <input
        type="password"
        placeholder="Admin password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      <button type="submit">Enter</button>
    </form>
  )
}