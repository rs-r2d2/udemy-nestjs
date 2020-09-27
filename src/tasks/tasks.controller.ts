import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipes } from './pipes/task-status.validation.pipes';
import { TaskStatus } from './enums/task-status.enum';
import { TasksFilter } from './dto/tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  constructor(private TaskService: TasksService) {}

  @Get()
  getTasks(
    @Query() filter: TasksFilter,
    @GetUser() user: User,
  ): Promise<Task[] | []> {
    return this.TaskService.getTasks(filter, user);
  }

  @Get('/:id')
  getTaskByID(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.TaskService.getTaskByID(id);
  }

  @Post('/')
  createTask(
    @Body() task: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.TaskService.createTask(task, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.TaskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipes) status: TaskStatus,
  ): Promise<void> {
    return this.TaskService.updateStatus(id, status);
  }
}
