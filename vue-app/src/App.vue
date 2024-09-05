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
