# React vs Vue vs Angular: A To-Do App Comparison

![image](https://github.com/user-attachments/assets/609fa6a9-de56-4d9d-8e22-d0527781f215)

In this blog, I will share my observations and experiences while building a simple To-Do app in three popular front-end frameworks: **React**, **Vue**, and **Angular**. I'll cover the differences in **project setup**, **component structure**, **state management**, **template syntax**, **performance**, and **community & ecosystem**.

## Overview React vs Vue vs Angular

When it comes to front-end development, **React**, **Vue**, and **Angular** are three of the most popular frameworks available today. While all three are powerful and widely used, they cater to slightly different needs and development philosophies. Here's a quick look at each framework:

### React

React is a **JavaScript library** developed by Facebook that focuses on building UI components. Its **component-based architecture** and the use of **JSX** make it very flexible and easy to integrate with other libraries or frameworks. However, it’s not a full-fledged framework, meaning features like routing and state management typically require additional libraries (e.g., React Router, Redux).

**Best For**: Developers looking for flexibility, a massive ecosystem, and integration with other technologies.

### Vue

Vue is a **progressive framework** that offers a balanced mix of simplicity and power. It’s designed to be easy to integrate into existing projects and also offers a component-based architecture similar to React. However, Vue provides more **out-of-the-box** features, such as routing and state management, making it more suitable for s**mall to medium-sized applications** without needing many external libraries.

**Best For**: Developers looking for an approachable framework that combines the flexibility of React with more built-in features.

### Angular

Angular is a **full-fledged front-end framework** developed by Google. It comes with everything you need right from the start, including a powerful **TypeScript-based structure, two-way data binding, routing, form handling**, and more. Angular’s architecture is designed for **large-scale applications**, making it more structured and opinionated than React or Vue. However, this comes at the cost of a steeper learning curve.

**Best For**: Large-scale applications that require a comprehensive framework with built-in tools and a strong emphasis on scalability.

## 1. Project Setup

### React
Setting up a React project is very straightforward, especially using `create-react-app`, which is optimized for a fast start with minimal configuration. Here's the command:
```bash
npx create-react-app react-app
```
This generates a fully-configured React project with everything you need, including a development server and build scripts. However, it doesn’t offer as much built-in functionality as Vue or Angular—routing, state management, and other advanced features need to be added separately.

### Vue
For Vue, I used the Vue CLI to scaffold the project. The Vue CLI offers a lot more options at the initial setup than React:

```bash
vue create vue-app
```
Vue’s project structure feels a bit more customizable from the start, allowing you to choose features like Vue Router and Vuex (state management) during setup. This gives more flexibility, but the initial process may feel overwhelming for beginners.

### Angular
Angular's setup is more complex compared to React and Vue, primarily because Angular is a complete framework. Using the Angular CLI:

```bash
ng new angular-app
```
It generates a project structure with everything included—routing, state management (with services), and testing. While this setup provides a lot of tools out-of-the-box, it can feel heavy for smaller projects.

Conclusion:

React: Simple, but requires additional packages for advanced features.
Vue: More flexible with initial configuration options.
Angular: Heavier setup but includes everything you need from the start.

## 1.5 TypeScript support

Since TypeScript is becoming increasingly popular and widely adopted in modern development, I wanted to highlight how each framework handles TypeScript integration and the differences you might encounter when using it.

### React

TypeScript is fully supported in React, but you need to configure it manually during setup. You can create a React project with TypeScript by using the following command:

```bash
npx create-react-app my-app --template typescript
```

This command scaffolds a React project with TypeScript configuration files and static typing out-of-the-box. Although React is primarily a JavaScript library, TypeScript helps catch errors early and enhances developer tooling, especially for larger projects.

### Vue

Vue 3 has native TypeScript support. When using the Vue CLI, you can select TypeScript during the setup process. This ensures that your Vue project is fully equipped for type-safe development from the start. To create a Vue project with TypeScript, use:

```bash
vue create vue-app
```

![image](https://github.com/user-attachments/assets/223b0920-e489-4105-97c5-34646f9211db)

Vue’s Composition API pairs well with TypeScript, making it easier to write and reuse typed logic across components.

### Angular

Angular is built entirely with TypeScript out-of-the-box, which is one of its key advantages. There's no additional setup needed for TypeScript since Angular was designed with it from the ground up. This makes Angular a great choice for teams that prioritize type safety, tooling, and scalability.

## 2. Component Structure

### React
React components are written in JavaScript using JSX, a syntax extension that lets you mix HTML with JavaScript. 

Although the files contain JSX syntax, you don’t need to name them .jsx. React components can be stored in files with the .js extension, and it works perfectly fine. This is because JSX is just a syntax extension for JavaScript, and modern build tools (like Babel) automatically handle JSX within .js files.

Here's a simple React component for the To-Do app:

```jsx
import React, { useState } from 'react';
import './TodoApp.css';  // Import the CSS file

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
      <h1>Todo App</h1>
      <div>
        <input 
          className="todo-input"
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Enter a new task"
        />
        <button className="todo-button" onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span>{task.text}</span>
            <div>
              <button 
                className="complete" 
                onClick={() => toggleComplete(index)}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button 
                className="remove" 
                onClick={() => removeTask(index)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;


```
React's component-based approach is straightforward and focuses on breaking down the UI into reusable pieces.

### Vue
Vue components are defined using Single File Components (SFCs), where the template, script, and style are in a single .vue file. This structure is easy to understand and keeps everything related to a component in one file.

```vue
<template>
  <div class="todo-container">
    <h1>Todo App</h1>
    <div>
      <input
        type="text"
        v-model="task"
        @keyup.enter="addTask"
        placeholder="Enter a new task"
        class="todo-input"
      />
      <button @click="addTask" class="todo-button">Add Task</button>
    </div>
    <ul>
      <li v-for="(taskItem, index) in tasks" :key="index" :class="{ completed: taskItem.completed }">
        <span>{{ taskItem.text }}</span>
        <div>
          <button @click="toggleComplete(index)" class="complete">
            {{ taskItem.completed ? 'Undo' : 'Complete' }}
          </button>
          <button @click="removeTask(index)" class="remove">Remove</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: '',
      tasks: []
    };
  },
  methods: {
    addTask() {
      if (this.task) {
        this.tasks.push({ text: this.task, completed: false });
        this.task = ''; 
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1); 
    },
    toggleComplete(index) {
      this.tasks[index].completed = !this.tasks[index].completed; 
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.todo-container {
  max-width: 60%;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h1 {
  text-align: center;
  color: #333;
}

.todo-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.todo-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-button:hover {
  background-color: #555;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  margin: 10px 0;
  background-color: #f9f9f9;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li.completed span {
  text-decoration: line-through;
  color: #aaa;
}

li button {
  margin-left: 10px;
}

li button.complete {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

li button.complete:hover {
  background-color: #218838;
}

li button.remove {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

li button.remove:hover {
  background-color: #c82333;
}
</style>

```
Vue’s component structure is intuitive, especially for developers who prefer keeping HTML, JavaScript, and CSS together.

### Angular
Angular components use a TypeScript-based structure with separate files for templates, logic, and styles. A typical component has a .ts, .html, and .css file:

todo.component.ts

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  task: string = '';  // Holds the current task input
  tasks: { text: string; completed: boolean }[] = [];  // Array of tasks

  // Adds a new task to the list
  addTask() {
    if (this.task.trim()) {  // Ensure input is not empty or whitespace
      this.tasks.push({ text: this.task.trim(), completed: false });
      this.task = '';  // Clear the input field
    }
  }

  // Removes a task from the list
  removeTask(index: number) {
    this.tasks.splice(index, 1);  // Remove task at the specified index
  }

  // Toggles the completion status of a task
  toggleComplete(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }
}
```

HTML file for the component (todo.component.html):

```html
<div class="todo-container">
    <h1>Todo App</h1>
    
    <div>
      <input
        type="text"
        [(ngModel)]="task"
        placeholder="Enter a new task"
        class="todo-input"
        aria-label="Task input"
      />
      <button (click)="addTask()" class="todo-button" [disabled]="!task.trim()">Add Task</button>
    </div>
    
    <ul>
      <li *ngFor="let taskItem of tasks; let i = index" [ngClass]="{ 'completed': taskItem.completed }">
        <span>{{ taskItem.text }}</span>
        <div>
          <button (click)="toggleComplete(i)" class="complete">
            {{ taskItem.completed ? 'Undo' : 'Complete' }}
          </button>
          <button (click)="removeTask(i)" class="remove">Remove</button>
        </div>
      </li>
    </ul>
</div>
```

Angular’s structure is more verbose than React or Vue, with strict separation of concerns, which can be overkill for smaller projects but highly useful in large-scale applications.

Conclusion:

React: Simple, focuses on JavaScript logic with JSX.
Vue: Intuitive with Single File Components.
Angular: More structured, great for large applications, but can feel verbose.

## 3. State Management

### React
React handles state internally using the useState hook or externally using libraries like Redux or Context API. Managing state in a small app like To-Do is simple:

```jsx
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
```
React’s ecosystem offers many external state management solutions, but none are provided by default.

### Vue
Vue has a built-in state management system using Vuex for large applications, though for small projects, local state is managed with reactive properties:

```javascript
export default {
    data() {
      return {
        task: '',     // Holds the value of the input field for new tasks
        tasks: []     // An array that stores the list of tasks
      };
    }
}
```
Vue’s reactivity system makes local state management simple and intuitive.

### Angular
In this example, Angular manages state through a service that encapsulates the logic for handling tasks. The `TodoService` is responsible for storing tasks, while the `TodoComponent` interacts with the service to manipulate and display the state. This approach separates concerns and makes the code modular and reusable.

The `TodoService` holds the list of tasks and exposes methods to add, remove, and toggle tasks:

```typescript
@Injectable({
    providedIn: 'root'
})
export class TodoService {
    tasks: { text: string; completed: boolean }[] = [];

    addTask(task: string) {
        this.tasks.push({ text: task, completed: false });
    }

    removeTask(index: number) {
        this.tasks.splice(index, 1);
    }

    toggleComplete(index: number) {
        this.tasks[index].completed = !this.tasks[index].completed;
    }

    getTasks() {
        return this.tasks;
    }
}
```

The `TodoComponent` uses the `TodoService` to interact with the tasks. It no longer manages the state directly but instead delegates the state management to the service:

```typescript
import { Component } from '@angular/core';
import { TodoService } from './todo.service';  // Import the service

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  task: string = '';

  constructor(public todoService: TodoService) {}  // Inject the service

  addTask() {
    this.todoService.addTask(this.task);  // Delegate to the service
    this.task = '';  // Clear the input field
  }

  removeTask(index: number) {
    this.todoService.removeTask(index);  // Delegate to the service
  }

  toggleComplete(index: number) {
    this.todoService.toggleComplete(index);  // Delegate to the service
  }

  get tasks() {
    return this.todoService.getTasks();  // Access tasks via the service
  }
}
```

This approach of using a service for state management is a common practice in Angular, especially when state needs to be shared across multiple components or persisted in a centralized place.

For larger applications with more complex state management needs, Angular developers often turn to NgRx, a library that provides a more robust and centralized way to manage state, similar to Redux. NgRx allows for predictable state management with actions, reducers, and effects, which is beneficial for complex data flows, but it also adds complexity and overhead.

In this case, using a service for managing tasks is a simple yet scalable solution, well-suited for small to medium-sized apps.

Conclusion:

React: Flexible but relies on external solutions for large apps.
Vue: Offers Vuex for large applications, built-in reactivity for smaller apps.
Angular: Uses services and external libraries like NgRx for complex state management.

## 4. Template Syntax

### React
React uses JSX, which mixes HTML with JavaScript, allowing you to manage the UI and logic in the same file. While this approach may initially feel unnatural for developers used to separating markup and logic, it has become the norm in React.

Here’s an example from your `TodoApp` component:

```jsx
<input 
  className="todo-input"
  type="text" 
  value={task} 
  onChange={(e) => setTask(e.target.value)} 
  placeholder="Enter a new task"
/>
```

In this example, the `value` of the input is bound to the `task` state, and the `onChange` event updates the state when the user types in the input field. The logic is directly embedded in the JSX.

### Vue
Vue uses a template syntax that’s closer to traditional HTML, with Vue directives like `v-model` for two-way data binding. Vue’s approach separates the template and logic, which some developers find more intuitive.

Here’s an example from your Vue `TodoApp` component:

```html
<input
  type="text"
  v-model="task"
  @keyup.enter="addTask"
  placeholder="Enter a new task"
  class="todo-input"
/>
```

In this case, `v-model` binds the input’s value to the `task` data property, and the `@keyup.enter` directive allows you to add a task when the Enter key is pressed.

### Angular

Angular templates are HTML-based but feature powerful directives like `*ngIf`, `*ngFor`, and two-way data binding with `[(ngModel)]`. This structure provides flexibility but can be more verbose than Vue's template syntax.

Here’s an example from your Angular `TodoComponent`:

```html
<input
  type="text"
  [(ngModel)]="task"
  placeholder="Enter a new task"
  class="todo-input"
  aria-label="Task input"
/>
<button (click)="addTask()" class="todo-button" [disabled]="!task.trim()">Add Task</button>
```
In this example, `[(ngModel)]` binds the input to the `task` property, while `aria-label` improves accessibility. The button is disabled when the `task` input is empty or contains only whitespace.

Conclusion:

React: JSX offers flexibility but may feel less intuitive for HTML developers.
Vue: Clean and easy-to-read template syntax.
Angular: Powerful but more complex syntax with detailed features.

## 5. Performance

### React
React is known for its performance due to the Virtual DOM and efficient re-rendering. It’s fast but requires careful optimization for complex apps (e.g., shouldComponentUpdate, memoization).

### Vue
Vue also uses a Virtual DOM and is highly optimized for performance. Vue’s reactive system makes it fast by default, and there’s little overhead even in larger apps.

### Angular
Angular is powerful but heavier compared to React and Vue due to its two-way data binding and full-featured framework. However, with Ahead-of-Time (AOT) compilation and tree shaking, Angular apps can be highly performant.

Conclusion:

React: Excellent performance with a focus on efficiency.
Vue: Fast and optimized, with a minimal performance overhead.
Angular: Heavier but still performant with the right configurations.

## 6. Community & Ecosystem

### React
React has a massive community and ecosystem, with extensive third-party libraries, plugins, and tools. It’s widely adopted by large companies, making it a strong choice for both small and enterprise-level projects.

### Vue
Vue’s community is smaller than React’s but growing rapidly. It has a dedicated and passionate user base, with a strong ecosystem of official tools (Vue Router, Vuex). Vue is popular among developers looking for a more flexible and beginner-friendly framework.

### Angular
Angular has a robust ecosystem but is often seen as more complex than React or Vue. It’s popular among enterprise-level companies due to its full-featured framework. Google’s backing also gives Angular strong long-term support.

Conclusion:

React: Largest community, with an extensive ecosystem of tools.
Vue: Growing fast, with strong official libraries.
Angular: Stable, backed by Google, but has a steeper learning curve.

Final Thoughts

Each of these frameworks has its strengths and weaknesses. React is flexible and has a huge community but can require more configuration for larger apps. Vue offers an elegant and simple solution for both small and large projects with a natural syntax. Angular provides a complete solution out-of-the-box but can feel heavy for small apps.

Ultimately, the right choice depends on the specific needs of your project. For smaller projects or developers who prefer flexibility, Vue or React might be the best choice. For large-scale applications with complex requirements, Angular is often the go-to solution.

This blog post captures my experience building the same app across these three frameworks. Hopefully, this provides a clearer picture of which framework might suit your next project!
