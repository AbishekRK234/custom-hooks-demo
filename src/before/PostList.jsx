import { useEffect, useState } from 'react'

// BEFORE: the same fetch, debounce and localStorage logic copy-pasted again
export default function PostList() {
  // --- fetch logic (duplicated) ---
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=20', { signal: controller.signal })
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
      const saved = window.localStorage.getItem('posts-search')
      return saved !== null ? JSON.parse(saved) : ''
    } catch {
      return ''
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('posts-search', JSON.stringify(search))
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

  const filtered = (data || []).filter((p) =>
    p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  return (
    <section className="card">
      <h2>Posts</h2>
      <input
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {filtered.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </section>
  )
}
