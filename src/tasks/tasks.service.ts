import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskStatus } from './task-status.enum'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly repository: TaskRepository,
  ) {}

  public async findAll(): Promise<Task[]> {
    return await this.repository.find()
  }

  public async findOne(id: number): Promise<Task> {
    const found = await this.repository.findOne(id)

    if (!found) {
      throw new NotFoundException(`Task with id : ${id} not found`)
    }

    return found
  }

  public async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task()
    task.title = createTaskDto.title
    task.description = createTaskDto.description
    task.status = TaskStatus.OPEN
    await task.save()

    return task
  }
}
