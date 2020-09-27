import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { TasksFilter } from './dto/tasks-filter.dto';
// import { TaskStatusValidationPipes } from './pipes/task-status.validation.pipes';

@Controller('tasks')
export class TasksController {
  constructor(private TaskService: TasksService) {}

  // @Get()
  // getTasks(@Query() filter: TasksFilter): Task[] {
  //   return this.TaskService.getAllTasks(filter);
  // }

  // @Get('/:id')
  // getTaskByID(@Param('id') id: string): Task {
  //   return this.TaskService.getTaskByID(id);
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
  //   return this.TaskService.createTask(CreateTaskDto);
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   this.TaskService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipes) status: TaskStatus,
  // ): void {
  //   this.TaskService.updateTaskStatus(id, status);
  // }
}
