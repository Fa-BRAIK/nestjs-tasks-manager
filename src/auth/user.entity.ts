import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Task } from 'src/tasks/task.entity'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() username: string
  @Column() salt: string
  @Column() password: string

  @OneToMany(
    type => Task,
    task => task.user,
    { eager: true },
  )
  tasks: Task[]

  async validatePassword(password: string): Promise<boolean> {
    return this.password === (await bcrypt.hash(password, this.salt))
  }
}
