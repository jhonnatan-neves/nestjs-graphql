import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserResolver} from './user.resolver';
import {UserRepository} from "./user.repository";
import {TypeOrmModule} from "@nestjs/typeorm";

const orm = [UserRepository];

@Module({
  imports: [
    TypeOrmModule.forFeature(orm)
  ],
  providers: [
    UserService,
    UserResolver
  ],
  exports: [
    UserResolver
  ]
})
export class UserModule {
}
