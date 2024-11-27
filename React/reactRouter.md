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

## Relative Links
- instead of including full paths, you can use to with
- '.' - current 'parent' route
- '..' - previous 'parent' route
- relative='path' - one path instead of parent route
``` JavaScript
    <Link
        to=".."
        relative="path"
        className="back-button"
    >&larr; <span>Back to all vans</span></Link>
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

// to prevent index from being active with nested routes, include end:
    <nav className="host-nav">
        <NavLink
            to="/host"
            end
            style={({ isActive }) => isActive ? activeStyles : null}
        >
            Dashboard
        </NavLink>
    </nav>
```

## Outlet Context 
- outlet has its own context, so we can pass params to the outlet component via useOutletContext

``` JavaScript
// Calling component:
    <Outlet context={{ currentVan }} />

// Called component:
    import React from "react"
    import { useOutletContext } from "react-router-dom"

    export default function HostVanInfo() {
        const { currentVan } = useOutletContext()
        
        return (
            <section>
                <h4>Name: {currentVan.name}</h4>
            </section>
        )
    }
```

## Search/Query Parameters
- commonly used for sorting, filtering, pagination
- useSearchParams

``` JavaScript
// access the searchParams and get the type
const [searchParams, setSearchParams] = useSearchParams()
const typeFilter = searchParams.get("type")

// filter based on if a search param exists or not
const filterVans = typeFilter 
    ? vans.filter(van => van.type.toLowerCase() === typeFilter)
    : vans

// map over the filtered vans
const vanElements = filterVans.map(van => (
    <div key={van.id} className="van-tile">
        <VanDisplay van={van}/>
    </div>
))

// using a Link to set a searchParam
<Link 
    to="?type=simple"
    className="van-type simple"
>Simple</Link>  
// using a button to set a searchParam
<button 
    onClick={() => setSearchParams({type: "simple"})}
    className="van-type simple"
>Simple</button>

// function for multiple query params
  function genNewSearchParamString(key, value) {
    const sp = new URLSearchParams(searchParams)
    if (value === null) {
      sp.delete(key)
    } else {
      sp.set(key, value)
    }
    return `?${sp.toString()}`
  }

    <Link to={genNewSearchParamString("type", "simple")}>Simple</Link>
```

## Navigate
- if Navigate is rendered, it will automatically re-route to the new path
``` JavaScript
import React from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function AuthRequired() {
    const authenticated = true
    if (!authenticated) {
        return <Navigate to="/login" />
    }
        
    return <Outlet />
}
```

## useLocation 
- allows you to access the current path, saved url state, and other location details

## 404 page
- a splat or catch route
``` JavaScript
    <Route path="*" element={<NotFound />} />
```

## Happy Path and Sad Path
- a "Happy Path" is when things go correctly (API fetch successful)
- a "Sad Path" is when things go wrong (API fetch error)

## Protected Routes
- Stops data fetching of sensitive information

``` JavaScript
function AuthRequired() {
    // check auth here...
    const authenticated = false
    
    if (!authenticated) {
        return (
            <Navigate 
                to="/login" 
                // optional - pass message using Browser (non-React) state
                state={{message: "You must log in first"}} 
            />)
        }
    }

    // in your login component, optionally render the Navigate message
    const location = useLocation()
    {
        location.state?.message &&
        <h3 className="login-first">{location.state.message}</h3>
    }

    // in routes, wrap protected routes with AuthRequired component
    <Route element={<AuthRequired />}>
    <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="income" element={<Income />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="vans" element={<HostVans />} />
        <Route path="vans/:id" element={<HostVanDetail />}>
        <Route index element={<HostVanInfo />} />
        <Route path="pricing" element={<HostVanPricing />} />
        <Route path="photos" element={<HostVanPhotos />} />
        </Route>
    </Route>
    </Route>
```