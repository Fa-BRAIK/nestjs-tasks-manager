import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { ITask } from './task.model'
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

  @Delete('delete/:id')
  delete(@Param('id') id: string): void {
    this.tasksService.delete(id)
  }
}
