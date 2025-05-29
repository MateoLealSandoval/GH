import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/common/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // Se corrige
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'varchar', default: Role.VISITOR, enum: Role })
  role: Role;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: true, nullable: false })
  isActive: boolean;

  @Column({ nullable: false })
  numberId: string;

  @Column({ nullable: true })
  lastLogin: Date;
}
