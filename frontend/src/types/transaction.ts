export type TransactionType = 'credit' | 'debit';
export type Currency = 'BRL' | 'USD' | 'EUR';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  currency: Currency;
}
