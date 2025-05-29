import { DivipolaCountry } from 'src/modules/divipola_countries/entities/divipola_country.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class DivipolaDepartment {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ nullable: false, unique: true })
  officialISOName: string;

  @Column({ nullable: false, unique: true })
  numericCode: string;

  @Column({ nullable: false, length: 3 })
  countryNumericCode: string;

  @ManyToOne(() => DivipolaCountry, (country) => country.numericCode, {
    nullable: false,
  })
  @JoinColumn({
    name: 'countryNumericCode',
    referencedColumnName: 'numericCode',
  })
  country: DivipolaCountry;

  @DeleteDateColumn()
  deletedAt?: Date;
}
