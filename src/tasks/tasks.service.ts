import { Injectable } from '@nestjs/common'
import { ITask, TaskStatus } from './task.model'
import * as uuid from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto'

@Injectable()
export class TasksService {
  private _tasks: ITask[] = []

  create(createTaskDto: CreateTaskDto): ITask {
    const { title, description } = createTaskDto

    const task: ITask = {
      id: uuid.v1(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this._tasks.push(task)
    return task
  }

  delete(id: string): void {
    this._tasks.filter(task => task.id !== id)
  }

  task(id: string): ITask {
    return this._tasks.find(task => task.id === id)
  }

  get tasks(): ITask[] {
    return this._tasks
  }
}
