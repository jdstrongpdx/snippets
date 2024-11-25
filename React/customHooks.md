# Custom Hooks
- Always start with the word use
- Hooks allow us to hook into the render cycle

``` JavaScript
// App for rendering a menu button, dropdown and items
function App() {
  return (
    <>
      <Menu onOpen={() => console.log("Opened/closed")}>
        <Menu.Button>Menu</Menu.Button>
        <Menu.Dropdown>
          <Menu.Item>Home</Menu.Item>
          <Menu.Item>About</Menu.Item>
          <Menu.Item>Contact</Menu.Item>
          <Menu.Item>Blog</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}


// useToggle custom hook that sets state and function later used in context
function useToggle({
    initialValue = false,
    onToggle = () => { }
}) {
    const [on, setOn] = React.useState(initialValue)

    function toggle() {
        setOn(prevOn => !prevOn)
    }
    
    useEffectOnUpdate(onToggle, [on])

    return [on, toggle]
}

// Create context to store state, function pair
const MenuContext = React.createContext()
// Export context
export { MenuContext }

export default function Menu({ children, onOpen }) {
    // get useToggle custom hook to init state, function
    const [open, toggleOpen] = useToggle({
        initialValue: true, 
        onToggle: onOpen
    })

    return (
        // pass state, function to context and wrap children
        <MenuContext.Provider value={{ open, toggleOpen }}>
            <div className="menu">
                {children}
            </div>
        </MenuContext.Provider>
    )
}
 
// button using context function
function MenuButton({ children }) {
    const { toggleOpen } = React.useContext(MenuContext)
    return (
        <Button onClick={toggleOpen}>{children}</Button>
    )
}

// conditionally render drop down menu based on context state
function MenuDropdown({ children }) {
    const { open } = React.useContext(MenuContext)

    return (
        <>
            {open ? (
                <div className="menu-dropdown">
                    {children}
                </div>
            ) : null
            }
        </>
    )
}

// render menu item children
function MenuItem({ children }) {
    return (
        <div className="menu-item">
            {children}
        </div>
    )
}


// index file to package component
import Menu from "./Menu"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropdown"
import MenuItem from "./MenuItem"

Menu.Button = MenuButton
Menu.Dropdown = MenuDropdown
Menu.Item = MenuItem

export default Menu
```