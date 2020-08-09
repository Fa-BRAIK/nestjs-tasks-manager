import { Injectable } from '@nestjs/common'
import { ITask, TaskStatus } from './task.model'
import * as uuid from 'uuid'

@Injectable()
export class TasksService {
  private _tasks: ITask[] = []

  create(title: string, description: string): ITask {
    const task: ITask = {
      id: uuid.v1(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this._tasks.push(task)
    return task
  }

  get tasks(): ITask[] {
    return this._tasks
  }
}
