import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Transaction } from '../entity/transaction';

const router = Router();
const transactionRepo = AppDataSource.getRepository(Transaction);

// GET /transactions – listar todas
router.get('/', async (req: Request, res: Response) => {
  const transactions = await transactionRepo.find();
  return res.json(transactions);
});

// POST /transactions – criar nova
router.post('/', async (req: Request, res: Response) => {
  const { date, description, amount, type, currency } = req.body;

  const transaction = transactionRepo.create({
    date,
    description,
    amount,
    type,
    currency,
  });

  await transactionRepo.save(transaction);
  return res.status(201).json(transaction);
});
// DELETE /transactions/:id – deletar uma transação por ID
router.delete('/:id', async (req: Request, res: Response) => {
  console.log('Body recebido no DELETE:', req.body);

  const { id } = req.params;
  const { password } = req.body;

  console.log('Senha enviada:', password);
  console.log('Senha do process.env.ADMIN_PASSWORD:', (process.env.ADMIN_PASSWORD || '').trim());


  if (password !== (process.env.ADMIN_PASSWORD || '').trim()) {
    return res.status(401).json({ message: 'Senha incorreta.' });
  }

  const transaction = await transactionRepo.findOneBy({ id });

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found.' });
  }

  await transactionRepo.remove(transaction);

  return res.status(204).send();
});



export default router;
