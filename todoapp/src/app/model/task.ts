export interface Task{
    "itemId": number;
    "taskName": string;
    "taskDescription": string;
    "dueDate": Date;
    "createdOn": Date;
    "isCompeleted": boolean;
    "tags": string;
    "completedOn": Date;
}

export interface ApiResponseModel{
    message: string;
    result: string;
    data: any;
}