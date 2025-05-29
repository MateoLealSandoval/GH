import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum SkillType {
  TECHNICAL = 'technical',
  SOFT = 'soft',
}

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  normalizedName: string;

  @Column({ type: 'varchar', enum: SkillType })
  type: SkillType;

  @Column()
  createdbyAI: boolean;

  @Column({ default: false })
  flaggedForReview: boolean;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  deprecated: boolean;

  @Column('simple-json', { nullable: true })
  embedding: number[];

  @CreateDateColumn()
  createdAt: Date;
}
