import { useState, useEffect } from 'react';
import type { Transaction, TransactionType, Currency } from '../types/transaction';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../api';
import { TransactionTable } from './TransactionTable';

export function TransactionForm() {
  const [form, setForm] = useState<{
    date: string;
    description: string;
    amount: string;
    type: TransactionType;
    currency: Currency;
  }>({
    date: '',
    description: '',
    amount: '',
    type: 'credit',
    currency: 'BRL',
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function loadTransactions() {
      const response = await api.get('/transactions');
      setTransactions(response.data);
    }

    loadTransactions();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTransaction: Transaction = {
      id: uuidv4(),
      date: form.date,
      description: form.description,
      amount: parseFloat(form.amount),
      type: form.type,
      currency: form.currency,
    };

    await api.post('/transactions', newTransaction);

    const response = await api.get('/transactions');
    setTransactions(response.data);

    setForm({
      date: '',
      description: '',
      amount: '',
      type: 'credit',
      currency: 'BRL',
    });
  };

  const handleDelete = async (id: string) => {
    const password = window.prompt('Digite a senha para deletar esta transação:');

    if (!password) {
      alert('Senha não informada.');
      return;
    }

    try {
      await api.request({
        method: 'DELETE',
        url: `/transactions/${id}`,
        data: { password },
      });

      alert('Transação deletada com sucesso!');

      const response = await api.get('/transactions');
      setTransactions(response.data);
    } catch (error: any) {
      console.error('Erro ao deletar transação:', error);
      alert(error.response?.data?.message || 'Erro ao deletar transação.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
          />
        </div>

        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>

        <div>
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            name="currency"
            value={form.currency}
            onChange={handleChange}
          >
            <option value="BRL">Real (BRL)</option>
            <option value="USD">Dólar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
          </select>
        </div>

        <button type="submit">Add Transaction</button>
      </form>

      <hr />

      <TransactionTable transactions={transactions} onDelete={handleDelete} />
    </div>
  );
}
