import { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaCalendarAlt, FaRegFileAlt } from 'react-icons/fa';
import type { Transaction } from '../types/transaction';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export function TransactionTable({ transactions, onDelete }: Props) {
  const [filterMonth, setFilterMonth] = useState('');
  const [filterDescription, setFilterDescription] = useState('');
  const [filterType, setFilterType] = useState('');

  const clearFilters = () => {
    setFilterMonth('');
    setFilterDescription('');
    setFilterType('');
  };

  const filteredTransactions = transactions
    .filter((tx) => {
      const matchesDate = filterMonth ? tx.date.startsWith(filterMonth) : true;
      const matchesDesc = filterDescription
        ? tx.description.toLowerCase().includes(filterDescription.toLowerCase())
        : true;
      const matchesType = filterType ? tx.type === filterType : true;

      return matchesDate && matchesDesc && matchesType;
    })
    .sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });

  const totalsByCurrency = filteredTransactions.reduce((acc, tx) => {
    if (!acc[tx.currency]) {
      acc[tx.currency] = { credit: 0, debit: 0 };
    }
    if (tx.type === 'credit') {
      acc[tx.currency].credit += tx.amount;
    } else {
      acc[tx.currency].debit += tx.amount;
    }
    return acc;
  }, {} as Record<string, { credit: number; debit: number }>);

  return (
    <div>
      <h2>Transaction Table</h2>

      <table>
        <thead>
          <tr>
            <th>
              <FaCalendarAlt /> Date
            </th>
            <th>
              <FaRegFileAlt /> Description
            </th>
            <th>Amount</th>
            <th>Type</th>
            <th>Ações</th>
          </tr>
          <tr>
            <th>
              <input
                type="month"
                placeholder="Filtrar mês"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Filtrar descrição"
                value={filterDescription}
                onChange={(e) => setFilterDescription(e.target.value)}
              />
            </th>
            <th></th>
            <th>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="credit">Crédito</option>
                <option value="debit">Débito</option>
              </select>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((tx) => (
            <tr key={tx.id}>
              <td>{formatDate(tx.date)}</td>
              <td>{tx.description}</td>
              <td className={tx.type === 'credit' ? 'positive' : 'negative'}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: tx.currency,
                }).format(tx.amount)}
              </td>
              <td>
                {tx.type === 'credit' ? (
                  <span style={{ color: 'green' }}>
                    <FaArrowDown /> Credit
                  </span>
                ) : (
                  <span style={{ color: 'red' }}>
                    <FaArrowUp /> Debit
                  </span>
                )}
              </td>
              <td>
                <button onClick={() => onDelete(tx.id)}>Deletar</button>
              </td>
            </tr>
          ))}

          {Object.entries(totalsByCurrency).map(([currency, totals]) => (
            <tr key={currency}>
              <td colSpan={2}>
                <strong>Total ({currency})</strong>
              </td>
              <td colSpan={3}>
                <strong>
                  <span style={{ color: 'green' }}>
                    Credit:{' '}
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency,
                    }).format(totals.credit)}
                  </span>{' '}
                  |{' '}
                  <span style={{ color: 'red' }}>
                    Debit:{' '}
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency,
                    }).format(totals.debit)}
                  </span>
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={clearFilters} style={{ marginTop: '1rem' }}>
        Limpar Filtros
      </button>
    </div>
  );
}
