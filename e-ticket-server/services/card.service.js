import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createCard = async (data) => {
    return await prisma.card.create({ data });
};

const getCardBycardNumber = async (cardNumber) => {
    return await prisma.card.findUnique({
        where: { cardNumber: cardNumber },
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

const updateCard = async (cardNumber, updates) => {
    return await prisma.card.update({
        where: { cardNumber: cardNumber },
        data: updates,
    });
};

const deleteCard = async (cardNumber) => {
    return await prisma.card.delete({
        where: { cardNumber: cardNumber },
    });
};


const validateCard = async (totalPriceCheckOut,cardInfo) => {
    const card = await prisma.card.findUnique({
        where: { cardNumber: cardInfo.cardNumber },
    });
    if (!card) { return false; }
    // console.log(card);
    if (card.cardOwner != cardInfo.cardOwner ||
        card.cvc != cardInfo.cvc ||
        card.expirationYear != cardInfo.expirationYear ||
        card.expirationDay != cardInfo.expirationDay) {
        return false;
    }
    if (card.sold < totalPriceCheckOut){
        return 'sold error';
    }
    return card;
};


export default {
    createCard,
    getAllCards,
    getCardBycardNumber,
    updateCard,
    deleteCard,
    validateCard,
};
