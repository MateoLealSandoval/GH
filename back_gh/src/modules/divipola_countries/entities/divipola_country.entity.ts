import { Column, DeleteDateColumn, Entity } from 'typeorm';

@Entity()
export class DivipolaCountry {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ nullable: false, unique: true })
  officialISOName: string;

  @Column({ nullable: false, unique: true, length: 2 })
  alpha2Code: string;

  @Column({ nullable: false, unique: true, length: 3 })
  alpha3Code: string;

  @Column({ nullable: false, unique: true, length: 3 })
  numericCode: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
