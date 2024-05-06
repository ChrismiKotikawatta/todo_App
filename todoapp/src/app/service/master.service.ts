import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel, ITask, Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  loadAllTask() {
    throw new Error('Method not implemented.');
  }

  apiUrl: string = "https://60a21a08745cd70017576014.mockapi.io/api/v1";

  constructor(private http: HttpClient) { }

  getAllTaskList(): Observable<ITask> {
    return this.http.get<ITask>(`${this.apiUrl}/todo`)
    
  }

  getAllTask(id: number): Observable<ITask> {
    return this.http.get<ITask>(`${this.apiUrl}/todo/${id}`);
  }

  addNewTask(task: Task ) :Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(`${this.apiUrl}/todo`, task )
  }

  updateTask( obj: Task ) :Observable<ITask> {
    return this.http.put<ITask>(`${this.apiUrl}/todo/${obj.id}`, obj )
  }

  
  deleteTask(id: number ) :Observable<ITask> {
    return this.http.delete<ITask>(`${this.apiUrl}/todo/${id}` )
  }

  
}
