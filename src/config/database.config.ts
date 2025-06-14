import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'nest_demo',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // 仅在开发环境中使用
};