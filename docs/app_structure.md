This whole website is built upon the Vue framework.

**Overview of Vue**
Vue is a framework that built upon the standard HTML, CSS and Javascript framework.
What makes it better than the aforementioned framework is its ability to provide a declarative, component-based programming model to help develop UI of any difficulty.

What does it mean for the model to be declarative and component-based, you ask???

- **Declarative** programming quite literally tells the compiler/low-level what to do, not how to do this. This is in contrast to **Imperative** programming, which pertains to how a task will be carried out, i.e. instructions
- **Component-based** programming refers to the notion that by creating smaller pieces of code (for UI) which can be used and reused in code as needed. For example, the formant plots will not need to be changed, and so making appropriate UI for these will benefit developers in the future, simplifying the process.

Vue is being imported into the setup, and a Content Delivery Network (CDN). This means that Vue is not building the website. This means that Vue runs in the browser, and the components and logic will be defined in the JS files (or script tags).
The way that the Vue guide tells us to use their services, are as a Single-File Component (SFC). The advantage of this is that all of the component's (in JS), the templates (in HTML) and the styles (in CSS) are all in a single file.

**API Styles**

There are two ways to author Vue components: **Options API** and **Composition API**.

- **Options API** is the classic way of writing Vue components. The components are organised into distinct sections (i.e. data(), methods, computed, watch, props, components, mounted, created, updated, destroyed, template, emits, inject & provide).
- **Composition API** is a newer way of writing the components, which focus on a more basic structure where all the logic is inside of a setup() function.

Both can be mixed together, by combining the Composition API's setup() with the Options API functions, where functions within setup can be reused in the Options API's sections.
