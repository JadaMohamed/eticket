import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createSeatCategory = async (data) => {
    return prisma.seatCategory.create({data,});
};

const getAllSeatCategories = async () => {
    return prisma.seatCategory.findMany();
};


const getSeatCategorieById = async (seat_categ_id) => {
    return prisma.seatCategory.findUnique({
        where: { seat_categ_id },
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

export default {
    createSeatCategory,
    getAllSeatCategories,
    getSeatCategorieById,
    deleteSeatCategoryById,
    updateSeatCategory,
};
