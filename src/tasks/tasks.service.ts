import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskStatus } from './task-status.enum'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { User } from 'src/auth/user.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly repository: TaskRepository,
  ) {}

  public async find(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return await this.repository.getTasks(filterDto, user)
  }

  public async findOne(id: number, user: User): Promise<Task> {
    const found = await this.repository.findOne({
      where: { id, userId: user.id },
    })

    if (!found) {
      throw new NotFoundException(`Task with id : ${id} not found`)
    }

    return found
  }

  public async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.repository.createTask(createTaskDto, user)
  }

  public async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id : ${id} not found`)
    }
  }

  public async update(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.findOne(id, user)

    task.status = status
    await task.save()

    return task
  }
}
