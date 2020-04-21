import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
@Entity({name: 'users'})
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({type: 'varchar', unique: true, length: 150, nullable: false})
  email: string;

  @Column({type: 'varchar', length: 60, nullable: false})
  password: string;

  @Field()
  @Column({type: 'int', nullable: false})
  type: number;

  @Field()
  @Column({name: 'first_name', type: 'varchar', length: 200, nullable: false})
  firstName: string;

  @Field()
  @Column({name: 'last_name', type: 'varchar', length: 200, nullable: false})
  lastName: string;

  @Field()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @Field()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @Field()
  @DeleteDateColumn({name: 'deleted_at'})
  deletedAt: Date;
}
