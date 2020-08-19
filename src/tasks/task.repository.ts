import { Repository, EntityRepository } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskStatus } from './task-status.enum'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  public async getTasks(filter: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filter,
      query = this.createQueryBuilder('task')

    if (status) {
      console.log(status)
      query.andWhere('task.status = :status', { status })
    }

    if (search)
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      )

    return await query.getMany()
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task()
    task.title = createTaskDto.title
    task.description = createTaskDto.description
    task.status = TaskStatus.OPEN
    await task.save()

    return task
  }
}
