import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  date!: string;

  @Column()
  description!: string;

  @Column('decimal')
  amount!: number;

  @Column()
  type!: 'credit' | 'debit';

  @Column()
  currency!: 'BRL' | 'USD' | 'EUR';
}
