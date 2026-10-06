import { useState } from 'react'
import BeforeUsers from './before/UserList'
import BeforePosts from './before/PostList'
import BeforeTodos from './before/TodoList'
import AfterUsers from './after/UserList'
import AfterPosts from './after/PostList'
import AfterTodos from './after/TodoList'

export default function App() {
  const [version, setVersion] = useState('before')

  return (
    <main>
      <header>
        <h1>Custom Hooks for Reusable Logic</h1>
        <p className="muted">
          Both versions look and behave the same. <b>Before</b> repeats fetch, debounce and
          localStorage code in every component; <b>After</b> uses useFetch, useDebounce and
          useLocalStorage.
        </p>
        <div className="tabs">
          <button
            className={version === 'before' ? 'active' : ''}
            onClick={() => setVersion('before')}
          >
            Before (duplicated logic)
          </button>
          <button
            className={version === 'after' ? 'active' : ''}
            onClick={() => setVersion('after')}
          >
            After (custom hooks)
          </button>
        </div>
      </header>

      {version === 'before' ? (
        <div className="grid">
          <BeforeUsers />
          <BeforePosts />
          <BeforeTodos />
        </div>
      ) : (
        <div className="grid">
          <AfterUsers />
          <AfterPosts />
          <AfterTodos />
        </div>
      )}
    </main>
  )
}
