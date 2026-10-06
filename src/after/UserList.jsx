import useFetch from './hooks/useFetch'
import useDebounce from './hooks/useDebounce'
import useLocalStorage from './hooks/useLocalStorage'

// AFTER: the component only describes what it shows
export default function UserList() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users')
  const [search, setSearch] = useLocalStorage('users-search', '')
  const debouncedSearch = useDebounce(search, 400)

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
