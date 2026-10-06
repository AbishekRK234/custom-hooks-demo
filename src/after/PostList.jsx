import useFetch from './hooks/useFetch'
import useDebounce from './hooks/useDebounce'
import useLocalStorage from './hooks/useLocalStorage'

// AFTER: same behaviour as before, logic comes from the shared hooks
export default function PostList() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=20')
  const [search, setSearch] = useLocalStorage('posts-search', '')
  const debouncedSearch = useDebounce(search, 400)

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
