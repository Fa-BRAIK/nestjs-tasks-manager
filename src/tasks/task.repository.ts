import { Repository, EntityRepository } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskStatus } from './task-status.enum'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { User } from 'src/auth/user.entity'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  public async getTasks(
    filter: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = filter,
      query = this.createQueryBuilder('task')

    query.where('task.userId = :userId', { userId: user.id })

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

  public async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = new Task()
    task.title = createTaskDto.title
    task.description = createTaskDto.description
    task.status = TaskStatus.OPEN
    task.user = user
    await task.save()

    delete task.user

    return task
  }
}
