import { Component, signal } from '@angular/core';
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
  task = signal(''); 
  tasks = signal<{ text: string; completed: boolean }[]>([]); 

  addTask() {
    const taskValue = this.task();
    if (taskValue.trim()) {
      this.tasks.update(tasks => [...tasks, { text: taskValue.trim(), completed: false }]);
      this.task.set('');  
    }
  }

  removeTask(index: number) {
    this.tasks.update(tasks => tasks.filter((_, i) => i !== index));
  }

  toggleComplete(index: number) {
    this.tasks.update(tasks =>
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }
}
