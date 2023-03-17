import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createTransaction = async (data) => {
    return await prisma.transaction.create({ data });
};

const getTransactionById = async (id) => {
    return await prisma.transaction.findUnique({
        where: { id: parseInt(id) },
        include: {
            card: true
        }
    });
};

const getAllTransactions = async () => {
    return await prisma.transaction.findMany({
        include: {
            card: true
        }
    });
};

export default {
    createTransaction,
    getTransactionById,
    getAllTransactions
};
