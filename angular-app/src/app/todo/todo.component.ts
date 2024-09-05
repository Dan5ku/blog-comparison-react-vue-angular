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
  task: string = '';
  tasks: { text: string; completed: boolean }[] = [];

  addTask() {
    if (this.task) {
      this.tasks.push({ text: this.task, completed: false });
      this.task = '';  
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1); 
  }

  toggleComplete(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed; 
  }
}
