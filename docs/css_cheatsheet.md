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

## Layout and Display

| Class                    | Effect                                                          |
| ------------------------ | --------------------------------------------------------------- |
| `d-flex`                 | `display: flex;` Children inside paarents become flexed as well |
| `d-block`                | `display: block;` Used to stack blocks                          |
| `flex-column`            | Flex direction vertical                                         |
| `flex-row`               | Flex direction horizontal (default)                             |
| `justify-content-center` | Center items horizontally                                       |
| `align-items-center`     | Center items vertically                                         |
| `align-content-center`   | Center flex lines vertically                                    |
| `flex-grow-1`            | Makes an element grow to fill remaining space                   |
| `vh-100` / `full-vh`     | Full viewport height (custom/full height)                       |
| `w-100`                  | Full width                                                      |
| `h-100`                  | Full height                                                     |
| `overflow-hidden`        | Hide scrollbars (used for canvas background)                    |

## Grid (Bootstrap)

| Class                              | Effect                           |
| ---------------------------------- | -------------------------------- |
| `container-fluid`                  | Full-width container             |
| `row`                              | Bootstrap row wrapper            |
| `col`, `col-md-6`                  | Equal-width or half-width column |
| `p-3`, `p-4`                       | Padding (3 = 1rem, 4 = 1.5rem)   |
| `m-0`, `m-2`, etc.                 | Margin                           |
| `shadow`, `shadow-sm`, `shadow-lg` | Box shadow effects               |

## Text and Font

| Class                              | Effect              |
| ---------------------------------- | ------------------- |
| `text-center`                      | Center-align text   |
| `text-white`                       | White text color    |
| `fs-6`, `fs-1` to `fs-6`           | Font size levels    |
| `fw-bold`, `fw-normal`, `fw-light` | Font weight classes |
| `mb-0`, `mt-3`                     | Margin bottom/top   |
| `lh-sm`, `lh-base`, `lh-lg`        | Line height classes |

# Bootstrap Margins and Paddings

## Margins

| Class prefix | Meaning          | Direction (LTR) |
| ------------ | ---------------- | --------------- |
| `m` / `p`    | Margin / Padding | All sides       |
| `ms` / `ps`  | Start            | Left            |
| `me` / `pe`  | End              | Right           |
| `mt` / `pt`  | Top              | Top             |
| `mb` / `pb`  | Bottom           | Bottom          |
| `mx` / `px`  | X-axis           | Left + Right    |
| `my` / `py`  | Y-axis           | Top + Bottom    |

## Spacings

| Class suffix | Value       | CSS Equivalent  |
| ------------ | ----------- | --------------- |
| `-0`         | `0`         | `0rem`          |
| `-1`         | Extra small | `0.25rem` (4px) |
| `-2`         | Small       | `0.5rem` (8px)  |
| `-3`         | Medium      | `1rem` (16px)   |
| `-4`         | Large       | `1.5rem` (24px) |
| `-5`         | Extra large | `3rem` (48px)   |
| `-auto`      | Auto margin | `margin: auto`  |

## Buttons

| Class                                              | Effect                                         |
| -------------------------------------------------- | ---------------------------------------------- |
| `btn`                                              | Base button class                              |
| `btn-primary`, `btn-secondary`, `btn-danger`, etc. | Button styles                                  |
| `d-none`                                           | Hide element (`display: none`)                 |
| `me-1`, `ms-2`                                     | Margin end/start (e.g., spacing around radios) |

## Forms and Inputs

| Class                                                | Effect                           |
| ---------------------------------------------------- | -------------------------------- |
| `form-check`, `form-check-input`, `form-check-label` | Bootstrap radio/checkbox styling |
| `list-group`, `list-group-item`                      | Styled vertical list             |
| `form-control`                                       | Styled text/number input         |
