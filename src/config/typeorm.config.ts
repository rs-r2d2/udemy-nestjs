import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  database: 'taskDB',
  username: 'postgres',
  password: 'postgres',
  port: 5432,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
