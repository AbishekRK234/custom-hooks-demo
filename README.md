# Custom Hooks for Reusable Logic (React #9)

Industry assignment: extract repeated logic from 3 components into custom hooks.

- `src/before/` – UserList, PostList, TodoList each contain their own copy of fetch (loading/error/data + abort on unmount), debounce and localStorage logic.
- `src/after/` – the same 3 components using `useFetch`, `useDebounce` and `useLocalStorage` from `src/after/hooks/`.
- The app has a toggle to switch between the Before and After versions (they look and behave the same).

## Run

```bash
npm install
npm run dev        # open the URL shown (usually http://localhost:5173)
```

## Measure

```bash
npm run dup:before   # jscpd duplicate report for the Before version
npm run dup:after    # jscpd duplicate report for the After version
npm run lint         # ESLint with eslint-plugin-react-hooks
```

## Results

| Metric | Before | After |
| --- | --- | --- |
| Lines in the 3 components | 247 | 110 |
| Duplicated lines (jscpd) | 122 (49.4%) | 28 (16.2% incl. hooks) |
| Clones found | 11 | 5 (JSX markup only) |
| Hooks reused in components | – | each hook used in 3 |
| ESLint react-hooks errors | 0 | 0 |
