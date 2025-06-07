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

  // Filtrar e ordenar transações
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

  // Agrupar transações por mês
  const transactionsByMonth: Record<string, Transaction[]> = {};

  filteredTransactions.forEach((tx) => {
    const month = tx.date.slice(0, 7); // YYYY-MM
    if (!transactionsByMonth[month]) {
      transactionsByMonth[month] = [];
    }
    transactionsByMonth[month].push(tx);
  });

  // Calcular total por moeda para um grupo de transações
  const calculateTotals = (txs: Transaction[]) => {
    return txs.reduce((acc, tx) => {
      if (!acc[tx.currency]) {
        acc[tx.currency] = { credit: 0, debit: 0 };
      }
      if (tx.type === 'credit') {
        acc[tx.currency].credit += Number(tx.amount);
      } else {
        acc[tx.currency].debit += Number(tx.amount);
      }
      return acc;
    }, {} as Record<string, { credit: number; debit: number }>);
  };

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
          {Object.keys(transactionsByMonth)
            .sort((a, b) => (a > b ? -1 : 1)) // Mês mais recente primeiro
            .map((month) => {
              const txs = transactionsByMonth[month];
              const totals = calculateTotals(txs);

              return (
                <>
                  {/* Header do mês */}
                  <tr key={`header-${month}`}>
                    <td colSpan={5} style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                      {month.split('-')[1]}/{month.split('-')[0]}
                    </td>
                  </tr>

                  {/* Transações do mês */}
                  {txs.map((tx) => (
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

                  {/* Totais do mês */}
                  {Object.entries(totals).map(([currency, total]) => (
                    <tr key={`total-${month}-${currency}`}>
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
                            }).format(total.credit)}
                          </span>{' '}
                          |{' '}
                          <span style={{ color: 'red' }}>
                            Debit:{' '}
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency,
                            }).format(total.debit)}
                          </span>
                        </strong>
                      </td>
                    </tr>
                  ))}
                </>
              );
            })}
        </tbody>
      </table>

      <button onClick={clearFilters} style={{ marginTop: '1rem' }}>
        Limpar Filtros
      </button>
    </div>
  );
}
