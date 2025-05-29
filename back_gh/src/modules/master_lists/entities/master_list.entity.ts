import { Entity, Column, Unique } from 'typeorm';

@Entity()
@Unique(['type', 'code'])
export class MasterList {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  value: string;

  @Column({ nullable: false })
  code: number;

  @Column({ default: true })
  isActive: boolean;
}
