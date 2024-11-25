import React from 'react';
import ReactDOM from 'react-dom/client';
import Toggle from "./components/Toggle/index"

// App.js
function App() {
    return (
      <>
        <Toggle>
          <Toggle.Button>
            <Toggle.Display>
              {(on) => {
                return <div className={`box ${on ? "filled" : ""}`}></div>
              }}
            </Toggle.Display>
          </Toggle.Button>
        </Toggle>
      </>
    )
  }

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// Toggle.js
const ToggleContext = React.createContext()

export default function Toggle({ children, onToggle = () => {}}) {
    const [on, setOn] = React.useState(false)
    const firstRender = React.useRef(true)
    

    function toggle() {
        setOn(prevOn => !prevOn)
    }

    React.useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
        } else {
            onToggle()
        }
    }, [on])

    return (
        <ToggleContext.Provider value={{ on, toggle }}>
            {children}
        </ToggleContext.Provider>
    )
}

export { ToggleContext }

// ToggleButton.js
function ToggleButton({ children }) {
    const { toggle } = React.useContext(ToggleContext)
    
    return (
        <div onClick={toggle}>
            {children}
        </div>
    )
}

// ToggleOff.js

function ToggleOff({ children }) {
    const { on } = React.useContext(ToggleContext)
    
    return on ? null : children
}

// ToggleOn.js

function ToggleOn({ children }) {
    const { on } = React.useContext(ToggleContext)
    
    return on ? children : null
}

// ToggleDisplay.js
function ToggleDisplay({ children }) {
    const { on } = React.useContext(ToggleContext)
    // return the JSX function from the Parent with local state for Rendering
    return children(on)
}

index.js
import Toggle from "./Toggle"
import ToggleButton from "./ToggleButton"
import ToggleOn from "./ToggleOn"
import ToggleOff from "./ToggleOff"

// Commented out for file conflicts, but would retain for file:
//Toggle.Button = ToggleButton
//Toggle.On = ToggleOn
//Toggle.Off = ToggleOff

//export default Toggle