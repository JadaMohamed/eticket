import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createCard = async (data) => {
    return await prisma.card.create({ data });
};

const getCardById = async (id) => {
    return await prisma.card.findUnique({
        where: { id: parseInt(id) },
        include: {
            transactions: true,
            account: true,
        },
    });
};

const getAllCards = async () => {
    return await prisma.card.findMany({
        // include: {
        //      transactions: true,
        // }
    });
};

const updateCard = async (id, updates) => {
    return await prisma.card.update({
        where: { id: parseInt(id) },
        data: updates,
        include: {
            transactions: true,
            account: true,
        },
    });
};

const deleteCard = async (id) => {
    return await prisma.card.delete({
        where: { id: parseInt(id) },
    });
};


const validateCard = async (cardInfo) => {
    const card= await prisma.card.findUnique({
        where: { cardNumber: cardInfo.cardNumber },
    });
    if(!card){
        return false;
    }
    // if(card)
};


export default {
    createCard,
    getAllCards,
    getCardById,
    updateCard,
    deleteCard,
    validateCard,
};
