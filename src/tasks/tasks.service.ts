import { Injectable, NotFoundException } from '@nestjs/common'
import { ITask, TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'
import * as uuid from 'uuid'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'

@Injectable()
export class TasksService {
  private _tasks: ITask[] = []

  tasks(): ITask[] {
    return this._tasks
  }

  tasksFilter(filterDto: GetTasksFilterDto): ITask[] {
    const { status, search } = filterDto

    let tasks = this.tasks()

    if (status) tasks = tasks.filter(task => task.status === status)

    if (search)
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      )

    return tasks
  }

  task(id: string): ITask {
    let found = this._tasks.find(task => task.id === id)

    if (!found) {
      throw new NotFoundException()
    }

    return found
  }

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

  updateStatus(id: string, status: TaskStatus): ITask {
    const found = this.task(id)

    if (!found) {
      throw new NotFoundException()
    }

    found.status = status
    return found
  }

  delete(id: string): void {
    const found = this.task(id)

    if (!found) {
      throw new NotFoundException()
    }

    this._tasks.filter(task => task.id !== id)
  }
}
