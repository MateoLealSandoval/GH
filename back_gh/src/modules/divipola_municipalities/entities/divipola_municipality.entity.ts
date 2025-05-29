import { DivipolaDepartment } from 'src/modules/divipola_departments/entities/divipola_department.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class DivipolaMunicipality {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ nullable: false, unique: true })
  officialISOName: string;

  @Column({ nullable: false, unique: true })
  numericCode: string;

  @Column({ nullable: false })
  departmentNumericCode: string;

  @ManyToOne(() => DivipolaDepartment, (dept) => dept.numericCode, {
    nullable: false,
  })
  @JoinColumn({
    name: 'departmentNumericCode',
    referencedColumnName: 'numericCode',
  })
  department: DivipolaDepartment;

  @DeleteDateColumn()
  deletedAt?: Date;
}
