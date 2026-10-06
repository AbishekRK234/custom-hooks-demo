import { useEffect, useState } from 'react'

// BEFORE: fetch, debounce and localStorage logic written by hand inside the component
export default function UserList() {
  // --- fetch logic (duplicated) ---
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      })
    return () => controller.abort()
  }, [])

  // --- localStorage logic (duplicated) ---
  const [search, setSearch] = useState(() => {
    try {
      const saved = window.localStorage.getItem('users-search')
      return saved !== null ? JSON.parse(saved) : ''
    } catch {
      return ''
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('users-search', JSON.stringify(search))
    } catch {
      // ignore write errors
    }
  }, [search])

  // --- debounce logic (duplicated) ---
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(timer)
  }, [search])

  const filtered = (data || []).filter((u) =>
    u.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  return (
    <section className="card">
      <h2>Users</h2>
      <input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {filtered.map((u) => (
          <li key={u.id}>
            <strong>{u.name}</strong> <span className="muted">{u.email}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
