import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {Connection} from "typeorm";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ async: true})
@Injectable()
export class EntityExists implements ValidatorConstraintInterface {

  constructor(
    private readonly connection: Connection,
  ) {
  }

  validate(text: string, validationArguments: ValidationArguments) {
    // console.log(text, validationArguments.property, validationArguments.constraints);
    const where = {
      [validationArguments.property]: text
    };
    console.log(this.connection)
    return false;
    const entity = this.connection.getRepository(validationArguments.constraints[0]).findOne({
      where
    });
    return !!entity;
  }
}
