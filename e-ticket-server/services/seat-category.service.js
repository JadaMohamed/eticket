import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createSeatCategory = async (data) => {
    return prisma.seatCategory.create({ data, });
};

const getAllSeatCategories = async () => {
    return prisma.seatCategory.findMany();
};


const getSeatCategorieById = async (seat_categ_id) => {
    return prisma.seatCategory.findUnique({
        where: { seat_categ_id },
    });
};

const getEventCategories = async (event_id) => {
    return prisma.seatCategory.findMany({
        where: { event_id: parseInt(event_id) },
    });
};

const deleteSeatCategoryById = async (id) => {
    return await prisma.seatCategory.delete({
        where: { seat_categ_id: id },
    });
};

const updateSeatCategory = async (id, updates) => {
    return await prisma.seatCategory.update({
        where: { seat_categ_id: parseInt(id) },
        data: updates
    });
};

const getSheapestSeatCategorieByEevntId = async (event_id) => {
    const seatCategories = await prisma.seatCategory.findMany({
        where: { event_id },
    });
    // sort the seatCategories array by type_price
    const sortedSeatCategories = seatCategories.sort((a, b) => a.type_price - b.type_price);

    // retrieve the first element from the sorted array (which will be the seat category with the lowest type_price)
    const cheapestSeatCategory = sortedSeatCategories[0];
    return cheapestSeatCategory;

};



export default {
    createSeatCategory,
    getAllSeatCategories,
    getSeatCategorieById,
    deleteSeatCategoryById,
    updateSeatCategory,
    getEventCategories,
    getSheapestSeatCategorieByEevntId,
};
