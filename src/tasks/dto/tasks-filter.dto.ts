import { TaskStatus } from '../enums/task-status.enum';
export class TasksFilter {
  status: TaskStatus;
  search: string;
}
