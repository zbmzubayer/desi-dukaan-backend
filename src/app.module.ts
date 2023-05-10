import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './db/db.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234567890',
      database: 'DesiDukaanDB',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DbModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
