It often follows the following general pattern:

```
p {
    color: red,
    text-align: center;
}
```

where 'p' is a selector, in this case for the HTML element '\<p>'.

There are many types of selectors:

- CSS Element Selector - the \<p> used prior was used to change the paragraph element in general
- CSS id Selectors - `#` is used to assign a specific ID to ONE element (e.g. `#para1`). This means no repetition. In HTML, this may look something as `<p id="para1">`. Note that an id selector cannot begin with a number!
- CSS class Selector - `.` is used to assign a class attribute to an HTML element. You can specify if a certain element should trigger the class attributes to the element, i.e. `p.center`
- CSS Universal Selector - `*` changes ALL HTML elements.
- CSS Group Selector - You can group elements together if you want them to share properties, e.g. `p, h1, h2, {...}`

Use viewpoints, clamps and flexbox to keep things responsive

Snap Scrolling:
parent{scroll-snap-type: y mandatory;} children{scroll-snap-align: start;}