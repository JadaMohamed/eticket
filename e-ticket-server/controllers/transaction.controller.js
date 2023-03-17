import transactionService from '../services/transaction.service.js';

const createTransaction = async (req, res) => {
    try {
        const data = req.body;
        const transaction = await transactionService.createTransaction(data);
        return res.json(transaction);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const createManyTransactions = async (req, res) => {
    const { TransactionsData } = req.body;
    try {
        const newTransactions = await Promise.all(
            TransactionsData.map(transaction =>
                transactionService.createTransaction(transaction)
            )
        );
        res.json(newTransactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create Transactions' });
    }
};

const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await transactionService.getTransactionById(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        return res.json(transaction);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        return res.json(transactions);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default {
    createTransaction,
    createManyTransactions,
    getTransactionById,
    getAllTransactions
};
