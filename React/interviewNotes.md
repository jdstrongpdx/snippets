# Interview Notes

- for radio and checkbox entries - checked attribute is what allows it to be a controlled element.  Default values (defaultChecked, defaultValue) cannot be used in controlled elements

- use either a <label> tag with an input or add an aria-label in the input

- convert js to react site:
``` js
<div id="root"></div>

const domNode = document.getElementById("root")
const root = ReactDOM.createRoot(domNode)
root.render(<App />)
```

``` js
	setUserInput(prev => ({...prev, [event.target.name]: event.target.value }))
```

https://www.coursera.org/learn/react-js-challenges/ungradedWidget/eVyk3/word-power-challenge

