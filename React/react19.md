# React 19 Changes

## New Compiler
- automatically improves performance 
- no longer needed: memo, useMemo, and useCallback

## useTransition 
- tells React that certain state changes can be interrupted  
``` js
    const [isPending, startTransition] = useTransition()

    // interrupts setTab when the state is changed 
    function switchTab(tab) {
        startTransition (() => {
            setTab(tab)
            // can use isPending to determine transition state
        })
    }
```
 
## Actions
- actions happen when data is mutated
- functions that use async transitions are called actions
- 

``` js
// Prior form format
import ReactDOM from "react-dom/client"
import { useState } from "react"
import { updateNameInDB } from "./api"

function App() {
  // each variable has its own state
  const [input, setInput] = useState("")
  const [name, setName] = useState(
    () => JSON.parse(localStorage.getItem("name")) || "Anonymous user"
  )
  
  // changes are made using the event
  function handleChange(event) {
    setInput(event.target.value)
  }

  async function handleSubmit(event) {
    // prevent default is required 
    event.preventDefault()
    try {
      const newName = await updateNameInDB(input)
      setName(newName)
      setInput("")
    } catch (error) {
      console.error(error.message)
    }
  }

  // handleSubmit and handleChange are needed
  return (
    <>
      <p className="username">
        Current user: <span>{name}</span>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
```

``` js
// NEW form format without event handling
// Added error and loading handling using new useActionState()

import ReactDOM from "react-dom/client"
import { useState, useActionState } from "react"
import { updateNameInDB } from "./api"

function App() {
  // deconstructed useActionState variables
  const [state, actionFunction, isPending] = useActionState(
    // param for action function
    updateName,
    // param for state (changed to an object vs string)
    {
      error: null,
      name: JSON.parse(localStorage.getItem("name")) || "Anonymous user"
    }
  )

  async function updateName(prevState, formData) {
    try {
      const newName = await updateNameInDB(formData.get("name"))
      return { name: newName, error: null }
    } catch (error) {
      return { ...prevState, error: error }
    }
  }

  return (
    <>
      <p className="username">
        Current user: <span>{state.name}</span>
      </p>

      {isPending && <p>Loading...</p>}

      <form action={actionFunction}>
        <input
          type="text"
          name="name"
          required
        />
        <button type="submit">Update</button>
        {!isPending && state.error && <p className="error">{state.error.message}</p>}
      </form>
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
```

## New Hooks
- useActionState: tracks component state, pending status, and provides a wrapped action function for use in our form 
- useOptimistic: improves the user experience to feel like changes are immediate.
- useFormStatus: acts as a context consumer for the nearest parent form element



## Refs
- refs maintain state between renders without triggering a re-render
- used as a way to hold a DOM node

## use API
- not a hook - so doesn't need to follow hook rules 
- Reads async resources and automatically suspends the component
- can replace the useContext hook

``` js
// Example of using fetch in useEffect
import ReactDOM from "react-dom/client"
import { useState, useEffect, use } from "react"

function App() {
  const [ pokemon, setPokemon ] = useState(null)
  
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
      .then(res => res.json())
      .then(data => setPokemon(data))
  }, [])
  
  return (
    <>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <code>
          {JSON.stringify(pokemon, null, 1)}
        </code>
      </pre>
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
)
```

## useMeta hook
- making changes to the head of the page was difficult before (React Helmet)
- now => title, meta, and link tags are hoisted into the header section

``` js
  return (
    <article>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <meta name="author" content="Josh" />
      <link rel="author" href="https://twitter.com/joshcstory/" />
      <meta name="keywords" content={post.keywords} />
      <p>
        Eee equals em-see-squared...
      </p>
    </article>
  );
  ```