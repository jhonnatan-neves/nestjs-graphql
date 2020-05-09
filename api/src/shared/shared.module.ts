import {Module} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {EntityExists} from "./validator/entity-exists.constraint";
import {Validator, ValidatorConstraint} from "class-validator";

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    EntityExists,
    Validator,
  ],
  exports: [
    EntityExists,
    Validator
  ]
})
export class SharedModule {
}
