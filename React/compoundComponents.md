# React Compound Components


## Prop Drilling Solutions
1. Do nothing - it is ok to pass props a few levels
2. Compound Components - flatten the structure, easily pass props to deeply nested components
3. Context

## Implicit State
- Refers to state that isn’t explicitly defined using React’s useState, useReducer, or similar methods but instead is derived or inferred from existing props, state, or context.
1. React.Children - utility that provides methods for interacting with a component's direct children elements
    1. Methods:
        1. React.Children.map()
        2. React.Children.forEach()
    ``` JavaScript
    export default function Menu({ children }) {
        const [open, setOpen] = React.useState(true)

        function toggle() {
            setOpen(prevOpen => !prevOpen)
        }

        return (
            <div className="menu">
            // Map over the children
                {React.Children.map(children, (child) => {
                    // Clone child and apply passed props
                    return React.cloneElement(child, {
                        open,
                        toggle
                    })
                })}
            </div>
        )
    }
    ```
    2. Problems:
        1. It provides a specific solution and can be fragile
        2. It is limited in depth
2. Context
    1. Used for providing state within the tree - place at the highest common ancestor of need

    ``` JavaScript
    const ThemeContext = React.createContext()

    export default function App() {
        // Create common state
        const [theme, setTheme] = React.useState("light")

        // Create common function
        function toggleTheme() {
            setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
        }
        
        return (
            // Provide context and add state & function
            <ThemeContext.Provider value={{theme, toggleTheme}}>
                <div className={`container ${theme}-theme`}>
                    <Header />
                    <Button />
                </div>
            </ThemeContext.Provider>
        )
    }

    export { ThemeContext }

    const Button = () => {
        // Load context (if using is separate file)
        const { theme, toggleTheme } = React.useContext(ThemeContext)

        return (
            <button onClick={toggleTheme} className={`${theme}-theme`}>
                Switch Theme
            </button>
        )
    }

    const Header = () => {
        // Load context (if using is separate file)
        const { theme } = React.useContext(ThemeContext)

        return (
            <header className={`${theme}-theme`}>
                <h1>{theme === "light" ? "Light" : "Dark"} Theme</h1>
            </header>
        )
    }
    ```

## Dot Syntax Imports
- Instead of importing every component, group like components into a single import

    ``` JavaScript 
    import Menu from "./Menu"
    import MenuButton from "./MenuButton"
    import MenuDropdown from "./MenuDropdown"
    import MenuItem from "./MenuItem"

    Menu.Button = MenuButton
    Menu.Dropdown = MenuDropdown
    Menu.Item = MenuItem

    export default Menu

    // to use, use dot syntax for components
    <Menu.Button/>
    ```

## Headless Components
- They don't have any styled UI to display - they only provide functionality
- Ex - a toggle component that toggles a state and can wrap any component that needs a toggle
- Event bubbling - when an event happens, the event "bubbles" up the dom and triggers any events in the dom elements

## Adding focus using useRef
``` JavaScript 
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [text, setText] = React.useState("")
  const [list, setList] = React.useState([])
  // Create variable
  const inputRef = React.useRef(null)

  function handleChange(e) {
    setText(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!text) {
      return;
    }
    setList(prevList => [...prevList, text])
    setText("")
    // Call current and focus
    inputRef.current.focus()
    
  }
  
  return (
    <>
      <h2>React Project Ideas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={text}
          placeholder="Idea"
          // attach ref to DOM element
          ref={inputRef}
        />
        <button>Submit</button>
      </form>

      <ol>
        {list.map((item, i) => <li key={i}>{item}</li>)}
      </ol>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

## noop - No Op function - a no operation function
- for a parameter expecting a function, set the default to an empty function
``` JavaScript
    onToggle = () => {}
```

## Render Props
- Parent passes JSX as a function to a child, the child calls it with local state, and returns the JSX output for rendering
``` JavaScript
    import React from "react"
    import Decision from "./Decision"

    function App() {
        return (
            <div>
                <Decision>
                    {(goingOut) => {
                        return (
                            <h1>
                                Am I going out tonight?? {goingOut ?
                                    "Yes!" : "Nope..."}
                            </h1>
                        )
                    }}
                </Decision>
            </div>
        )
    }

    function Decision({ children }) {
        const [goingOut, setGoingOut] = React.useState(false)

        function toggleGoingOut() {
            setGoingOut(prev => !prev)
        }

        return (
            <div>
                <button onClick={toggleGoingOut}>Change mind</button>
                {children(goingOut)}
            </div>
        )
    }
```