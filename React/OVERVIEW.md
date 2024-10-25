1. React Lifecycle Methods (Class Components)
    constructor()	Initializes state and binds event handlers.
    componentDidMount()	Runs after the component is added to the DOM. Used for API calls or subscriptions.
    componentDidUpdate()	Runs when props or state change. Useful for responding to updates (like re-fetching data).
    componentWillUnmount()	Runs before the component is removed from the DOM. Used to clean up (e.g., unsubscribe or cancel timers).
    render()	Returns JSX to define how the component should be rendered on the screen.

2. Common React Hooks (Function Components)
    useState()	Manages local component state. Returns a state variable and a setter function.
    useEffect()	Manages side effects like data fetching or subscriptions. Replaces componentDidMount, componentDidUpdate, and componentWillUnmount.
    useContext()	Accesses values from a React Context provider without prop-drilling.
    useReducer()	An alternative to useState for managing complex state logic. Similar to Redux reducers.
    useMemo()	Memoizes a value to avoid expensive recalculations on every render.
    useCallback()	Memoizes a function to prevent unnecessary re-renders when passing it as a prop.
    useRef()	Maintains a mutable reference to an element or value across renders without causing re-renders.
    useLayoutEffect()	Similar to useEffect, but runs synchronously after all DOM changes (used rarely).

3. React Component Methods and Utilities
    React.createElement()	Creates a React element (used internally by JSX).
    React.cloneElement()	Clones an existing element with new props. Useful for reusing components.
    React.Children.map()	Safely iterates over children elements. Handles cases where only one child is present.
    React.memo()	Memoizes a component to prevent unnecessary re-renders if its props don’t change.
    React.forwardRef()	Allows parent components to pass a ref to a child component. Useful for focusing inputs.
    React.Fragment	Returns multiple children without adding extra DOM nodes.

4. Event Handlers in React
    onClick	Triggered when a user clicks an element.
    onChange	Triggered when the value of an input element changes.
    onSubmit	Triggered when a form is submitted.
    onKeyDown	Triggered when a key is pressed down.
    onFocus / onBlur	Triggered when an input element gains or loses focus.

5. React Router Methods (If Using React Router)
    useNavigate()	Navigates to a different route programmatically.
    useParams()	Accesses dynamic parameters from the route.
    useLocation()	Gets the current route location (pathname, search params).
    Link / NavLink	Creates navigation links to different routes.

6. State Management Tools (External Libraries)
    Redux / useSelector	Accesses global state managed by Redux.
    useDispatch()	Dispatches actions to update Redux state.
    React Query / useQuery	Manages data fetching and caching with automatic re-fetching on state changes.