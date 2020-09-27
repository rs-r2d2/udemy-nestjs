import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enums/task-status.enum';
import { TasksFilter } from './dto/tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filter: TasksFilter, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filter, user);
  }

  async getTaskByID(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ id });
    if (!task) {
      throw new NotFoundException(`Task with id:${id}`);
    }
    return task;
  }

  async createTask(task: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(task, user);
  }

  async deleteTask(id: number): Promise<void> {
    const { affected } = await this.taskRepository.delete({ id: id });
    if (!affected) {
      throw new NotFoundException(`Task with id:${id}`);
    }
  }

  async updateStatus(id: number, status: TaskStatus): Promise<void> {
    const { affected } = await this.taskRepository.update(
      { id },
      { status: status },
    );
    if (!affected) {
      throw new NotFoundException(`Task with id:${id}`);
    }
  }
}
