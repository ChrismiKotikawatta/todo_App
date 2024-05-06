export interface ITask {
    createdAt: Date;
    title: string;
    description: string;
    id: number;
  }
  
  export interface ApiResponseModel {
    message: string;
    status: number;
    data: ITask[];
    
  }
  
  export class Task {
    title: string;
    description: string;
    id: number;
    
  
    constructor() {
      this.description = '';
  
      this.title = '';
      this.id = 0;
    }
  }
  