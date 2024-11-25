# React Routing
- BrowserRouter - provides the context for Router
- Routes - wrapper for all Route routes
- Route - includes path and element 
``` JavaScript 
    <Route path="/" element={<Home />} />
```
- Link - takes anchor tags and prevents reload onClick - preserves state
``` JavaScript 
    <Link to="/">Home</Link>
```
- useParams - gets the params from the url as an object
``` JavaScript 
    const params = useParams();
```
- Nested routes - nesting pieces of the url or shared UI

## Layout Routes
- Doesn't have a route, put helps layout the page

``` JavaScript
import React from "react"
// use Outlet to render all children wrapped by this component
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <>
            <h1>This is the Layout Route</h1>
            <Outlet />
        </>
    )
}

// wrap children in the pathless Layout Route
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

## Relative Paths
- backslash denotes absolute path
- no backslash denotes relative path to parent element
- Index Route: for the base "/" of a route, replace path=... with index
``` JavaScript
    <Route path="host" element={<HostLayout />}> // Host Nav Parent
    <Route index element={<Dashboard />} /> // /host/
    <Route path="income" element={<Income />} /> // /host/income
    <Route path="reviews" element={<Reviews />} /> // /host/reviews
    </Route>
```

## Render Props
- Allows highlighting of Link for current page
- Uses NavLink instead of Link
``` JavaScript
// sets the className based on is page isActive or not
<NavLink 
    to="/about"
    className={({isActive}) => isActive ? "my-link" : null }
    // OR
    style={({isActive}) => isActive ? activeStyle : null }
>
```