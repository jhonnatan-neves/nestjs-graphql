import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserResolver} from './user.resolver';
import {UserRepository} from "./user.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SharedModule} from "../../shared/shared.module";
import {Validator} from "class-validator";

const orm = [UserRepository];

@Module({
  imports: [
    TypeOrmModule.forFeature(orm),
    SharedModule,
  ],
  providers: [
    UserService,
    UserResolver,
    Validator,
  ],
  exports: [
    UserResolver
  ]
})
export class UserModule {
}
