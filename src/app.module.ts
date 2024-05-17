import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'W3llc0m3@',
      database: 'shop',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
