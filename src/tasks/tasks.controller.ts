import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { ITask, TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(): ITask[] {
    return this.tasksService.tasks
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksService.task(id)
  }

  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksService.create(createTaskDto)
  }

  @Patch('update/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): ITask {
    return this.tasksService.updateStatus(id, status)
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): void {
    this.tasksService.delete(id)
  }
}
