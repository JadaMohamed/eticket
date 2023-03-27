import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const createOrganizer = async (data) => {
    try {
        const organizer = await prisma.organizer.create({
            data: {
                ...data,
            },
        });
        return organizer;
    } catch (error) {
        throw new Error(`Failed to create organizer: ${error.message}`);
    }
};

const getOrganizerById = async (org_id) => {
    return prisma.organizer.findUnique({
        where: { org_id },
        include: {
            // Account: true,
            Events: true,
        }
    });
};

const getProfitOrganizerById = async (org_id) => {
    return prisma.organizer.findUnique({
        where: { org_id },
       select:{
        profit:true,
       }
    });
};

const getOrganizerByAccountId = async (account_id) => {
    return prisma.organizer.findUnique({
        where: { account_id },
    });
};

const getAllOrganizers = async () => {
    return prisma.organizer.findMany({
        include: {
            Events: true,
        }
    });
};


const deleteOrganizerById = async (id) => {
    return await prisma.organizer.delete({
        where: { org_id: id },
    });
};

const updateOrganizer = async (id, updates) => {
    return await prisma.organizer.update({
        where: { org_id: parseInt(id) },
        data: updates
    });
};

export default {
    createOrganizer,
    getOrganizerById,
    getAllOrganizers,
    deleteOrganizerById,
    updateOrganizer,
    getOrganizerByAccountId,
    getProfitOrganizerById,
};
