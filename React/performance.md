# React Performance

## Rendering 
- Rendering is recursive (DFS)
- Phases of Rendering (based on state/context/props changes)
    1. Render - all components in the branch are called again
    2. Reconciliation - "Diffing" - determines what changed and what should be updated
    3. Commit to DOM - changes are "painted" to the DOM

## Profiling
- uses your browser to test the time it takes to render
- TIP: slow down the network/processor speed for more accurate results

## Strict Mode
- used for checking correct development
    1. Double renders all functions that should be pure functions
    2. Re-runs all effects in components - checks that functions are unmounted
    3. Gives warnings for depreciated ReactAPI's
    4. Only runs in development mode

``` JavaScript
  // wrapping the app in strict mode
  <React.StrictMode>
    <App />
  </React.StrictMode>

  // unmounting a interval function: 
      React.useEffect(() => {
        const id = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1)
            // console.log("Timer is running")
        }, 1000)
        return () => clearInterval(id)
    }, [])
```

## Code Splitting
- splits the downloading of the SPA into pieces and you control which pieces are automatically downloaded and which are downloaded when needed.
- uses dynamic-import and React.lazy

1. Implement React.lazy() (requires a default export on called component). Creates a "suspended component" that waits to be called.
2. Wrap the used component in React.Suspense with a fallback component to display while lazy loading

``` JavaScript
// 1. 
const ProductsList = React.lazy(() => {
  return import("./ProductsList")
})

// 2. 
<React.Suspense fallback={<h2>Loading...</h2>}>
<div className="products-list">
    {showProducts && <ProductsList />}
</div>
</React.Suspense>
```

## Caching
- useMemo - cache the result of 'expensive' calculations

``` JavaScript
  const productsCount = React.useMemo(() => {
    return slowCountItems(productsData, 500)
  }, [productsData])
```

- React.memo() - unrelated to useMemo... - used to maintain referential equality of a complex data type between renders
- a Higher Order Component (HOC) - a function that takes a component as an argument, adds some abilities to it, and gives the improved version back
- the component will be memoized if the props change
``` JavaScript
// export the component wrapped with React.memo
export default React.memo(GrandParent)
```

## Referential Equality
- Reference types (objects, arrays, functions) are determined by reference - ie. a single memory location.  When creating/comparing two identical objects, if they are not the same item in memory, React will re-render
- Solution: useMemo can maintain referential equality of a complex data type between renders

``` JavaScript
    const style = React.useMemo(() => {
        return {
            backgroundColor: darkMode ? "#2b283a" : "#e9e3ff",
            color: darkMode ? "#e9e3ff" : "#2b283a",
        }
    }, [darkMode])

```

## useCallback
- useCallback can maintain reference to functions between renders

``` JavaScript
    const increment = React.useCallback(() => {
        setCount(prevCount => prevCount + 1)
    }, [setCount])
```