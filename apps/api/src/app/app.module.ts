import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User';
import { Desk } from '../typeorm/entities/Desk';
import { Reservation } from '../typeorm/entities/Reservation';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { UserModule } from '../user/user.module';
import { DeskModule } from '../desk/desk.module';
import { ReservationModule } from '../reservation/reservation.module';

@Module({
  imports: [
    UserModule,
    DeskModule,
    ReservationModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      cors: {
        origin: '*',
      },
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.NX_API_HOST,
      port: parseFloat(process.env.NX_API_PORT),
      username: process.env.NX_API_USERNAME,
      password: process.env.NX_API_PASSWORD,
      database: process.env.NX_API_DATABASE,
      entities: [User, Desk, Reservation],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
