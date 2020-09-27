import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './enums/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilter } from './dto/tasks-filter.dto';

@Injectable()
export class TasksService {
  // private tasks: Task[] = [];
  // getAllTasks(filter: TasksFilter): Task[] {
  //   const status = filter && filter.status;
  //   const search = filter && filter.search;
  //   let tasks = this.tasks;
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  // getTaskByID(id: string): Task {
  //   const task = this.tasks.find(task => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`Task with id:${id}`);
  //   }
  //   return task;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const task: Task = {
  //     id: `${(Math.random() * 1e10).toFixed(0)}`,
  //     title: createTaskDto.title,
  //     description: createTaskDto.description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string): void {
  //   const taskIndex = this.tasks.findIndex(task => task.id === id);
  //   console.log(taskIndex);
  //   if (taskIndex >= 0) {
  //     this.tasks.splice(taskIndex);
  //   } else {
  //     throw new NotFoundException(`Task with id:${id}`);
  //   }
  // }
  // updateTaskStatus(id: string, status: TaskStatus): void {
  //   const taskIndex = this.tasks.findIndex(task => task.id === id);
  //   if (taskIndex >= 0) {
  //     this.tasks[taskIndex].status = status;
  //   } else {
  //     throw new NotFoundException(`Task with id:${id}`);
  //   }
  // }
}
