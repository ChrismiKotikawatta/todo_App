import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './service/master.service';
import { ApiResponseModel, ITask, Task } from './model/task';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  taskList: ITask[] = [];
  taskObj: Task = new Task();

  // masterService = inject(MasterService);
  constructor(private masterService: MasterService){};

  ngOnInit(): void {
    // Subscribe to the observable from getAllTaskList() method
    this.masterService.getAllTaskList().subscribe({
        next: (response) => {
            // Check if response is an array
            if (Array.isArray(response)) {
                // Assign the array of tasks to taskList
                this.taskList = response;
            } else {
                console.warn('Expected an array of tasks but received a different data structure.');
            }
        },
        error: (error) => {
            console.error('Failed to fetch tasks:', error);
        }
    });
}



  trackByFunction(index: number, item: any): any {
    return item.id; // Use a unique identifier property (e.g., `id`) for tracking
  }

  
  onDelete(id: number) {
    const isConfirm = confirm('Are you want to delete the task');
    if (isConfirm) {
      this.masterService.deleteTask(id).subscribe(
        (res: ITask) => {
          if (res) {
            alert('Task Deleted Success');
            console.log(res);
            this.ngOnInit();

          }
        },
        (error) => {
          alert('API Call Error');
        }
      );
    }
  }



  addTask() {
    console.log('Adding new task:', this.taskObj); // Log the task object being added
    this.masterService.addNewTask(this.taskObj).subscribe(
      (res: ApiResponseModel) => {
        console.log('API response:', res); // Log the API response
        console.log('Result property:', res.status);
        if (res != null) {
          alert('Task Created Success');
          this.taskObj = new Task();
          this.ngOnInit();
          console.log('Updated taskList:', this.taskList);
        } else {
          console.log('Task creation failed. Result:', res);
          alert('Task creation failed.');
        }
      },
      (error) => {
        console.error('API Call Error:', error);
        alert('API Call Error');
      }
    );
  }

  onEdit(task: ITask) {
    this.taskObj = task;
    console.log('Editing task title:', task.title);

    
  }

  updateTask() {
    this.masterService.updateTask(this.taskObj).subscribe(
      (res: ITask) => {
        if (res) {
          alert('Task Updated Success');
          this.ngOnInit();
          this.taskObj = new Task();
        }
      },
      (error) => {
        alert('API Call Error');
      }
    );
  }
}
