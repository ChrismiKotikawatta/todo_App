import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = "https://60a21a08745cd70017576014.mockapi.io/api/v1";

  constructor(private http: HttpClient) { }

  getAllTaskList(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(this.apiUrl + "/todo");
  }

  
}
