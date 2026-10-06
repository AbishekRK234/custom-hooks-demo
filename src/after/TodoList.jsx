import { useState } from 'react'
import useFetch from './hooks/useFetch'
import useDebounce from './hooks/useDebounce'
import useLocalStorage from './hooks/useLocalStorage'

// AFTER: three hooks replace about 50 lines of hand-written logic
export default function TodoList() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos?_limit=20')
  const [hideDone, setHideDone] = useLocalStorage('todos-hide-done', false)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400)

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
