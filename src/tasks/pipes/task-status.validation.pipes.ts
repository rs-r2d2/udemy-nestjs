import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../enums/task-status.enum';

export class TaskStatusValidationPipes implements PipeTransform {
  transform(value: unknown): string {
    let valueTransformed = '';
    if (typeof value === 'string') {
      valueTransformed = value.toUpperCase();
    }
    if (!TaskStatus[valueTransformed]) {
      throw new BadRequestException(`${valueTransformed} is invalid status`);
    }
    return valueTransformed;
  }
}
