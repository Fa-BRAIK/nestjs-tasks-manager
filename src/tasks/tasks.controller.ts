import { Controller, Get, Post, Body } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { ITask } from './task.model'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  index(): ITask[] {
    return this.tasksService.tasks
  }

  @Post('create')
  create(@Body() body): ITask {
    const { title, description } = body

    return this.tasksService.create(title, description)
  }
}
