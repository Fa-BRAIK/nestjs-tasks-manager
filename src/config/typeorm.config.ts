import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'dev',
  password: '',
  database: 'taskmanager',
  entities: [__dirname + '../**/*.entity.ts'],
  synchronize: true,
}
