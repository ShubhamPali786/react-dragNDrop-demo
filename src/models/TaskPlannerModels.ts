export interface ITaskList {
    columnName:string;
    tasks:ITask[];
}

export interface ITask {
  taskdetail: string;
  tags: string[];
  taskId?: string;
}
