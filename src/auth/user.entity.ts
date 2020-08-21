import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() username: string
  @Column() salt: string
  @Column() password: string

  async validatePassword(password: string): Promise<boolean> {
    return this.password === (await bcrypt.hash(password, this.salt))
  }
}
