import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', length: 100 })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ name: 'gender', type: 'enum', enum: UserGender })
  gender: UserGender;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
