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
  ParseIntPipe,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { Task } from './task.entity'
import { TaskStatus } from './task-status.enum'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public async find(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.find(filterDto)
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.findOne(id)
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  public async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto)
  }

  @Delete('delete/:id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.delete(id)
  }

  @Patch('update/:id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.update(id, status)
  }
}
