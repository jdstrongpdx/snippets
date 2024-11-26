# CSS Overview

## Usage for import
``` html 
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

## Terminology
``` css
p /* selector/type */ {
    /* elements */
    /* property : value */
    font-size: 12 px;
}
```

## Selector Types

- Element Selector - by html tag
- Id Selector - by html element id
- Class Selector - by html element class
- Element with Class Selector - html tag and class
- Descendant Selector - tags within html another selector
- Child Selector  - only selects elements that are immediate descendants of a selector

``` css
/* Element Selector */
p { 
  color: blue; 
}

/* Class Selector */
.navigation { 
  margin: 2px;
}

/* Id Selector */
#latest { 
  background-color: purple; 
}

/* Descendant Selector */
#blog h1 {
  color: blue;
}

/* Child Selector */
#blog > h1 {
  color: blue;
}
```

## Text Properties
- color - changes the text color
- font-family - change fonts and how they are displayed
- font-size
- text-transform - change to uppercase, lowercase, capitalize, and none
- text-decoration - underlines and strikethrough 
- text-style - solid, double, dotted, dashed and wavy

## Box Properties
- Content
- Padding
- Border
- Margin

## Alignment
- text-align - left, right, center, justify
- **html elements:**
- width
- border
- padding
- margin