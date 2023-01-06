import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('blocks')
export class Block {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column()
  x!: number;

  @Column()
  y!: number;

  @Column('simple-json', { default: () => '(JSON_OBJECT())' })
  data: {};
}
