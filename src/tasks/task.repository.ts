import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './enums/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilter } from './dto/tasks-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filter: TasksFilter, user: User): Promise<Task[]> {
    const { status, search } = filter;
    const query = this.createQueryBuilder('task');

    query.andWhere('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: search + '%' },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(task: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = task;
    const newTask = new Task();
    newTask.title = title;
    newTask.description = description;
    newTask.status = TaskStatus.OPEN;
    newTask.user = user;
    return await newTask.save({ reload: false });
  }
}
