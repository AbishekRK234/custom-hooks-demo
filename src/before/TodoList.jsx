import { useEffect, useState } from 'react'

// BEFORE: a third copy of the same fetch, debounce and localStorage logic
export default function TodoList() {
  // --- fetch logic (duplicated) ---
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=20', { signal: controller.signal })
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
  const [hideDone, setHideDone] = useState(() => {
    try {
      const saved = window.localStorage.getItem('todos-hide-done')
      return saved !== null ? JSON.parse(saved) : false
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('todos-hide-done', JSON.stringify(hideDone))
    } catch {
      // ignore write errors
    }
  }, [hideDone])

  // --- debounce logic (duplicated) ---
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(timer)
  }, [search])

  const filtered = (data || [])
    .filter((t) => !(hideDone && t.completed))
    .filter((t) => t.title.toLowerCase().includes(debouncedSearch.toLowerCase()))

  return (
    <section className="card">
      <h2>Todos</h2>
      <input
        placeholder="Search todos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <label className="check">
        <input
          type="checkbox"
          checked={hideDone}
          onChange={(e) => setHideDone(e.target.checked)}
        />
        Hide completed
      </label>
      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {filtered.map((t) => (
          <li key={t.id} className={t.completed ? 'done' : ''}>
            {t.title}
          </li>
        ))}
      </ul>
    </section>
  )
}
