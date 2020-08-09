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
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { ITask, TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): ITask[] {
    if (Object.keys(filterDto).length > 0) {
      return this.tasksService.tasksFilter(filterDto)
    }

    return this.tasksService.tasks()
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksService.task(id)
  }

  @Post('create')
  @UsePipes(ValidationPipe)
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
