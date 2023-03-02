import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createClientWaitList = async (data) => {
    return prisma.clientWaitList.create({data});
};

const getClientWaitLists = async () => {
    return prisma.clientWaitList.findMany({
    });
};

const getClientWaitListsById = async (client_wait_id) => {
    return prisma.clientWaitList.findUnique({
        where: { client_wait_id },
    });
};


const deleteClientWaitList = async (id) => {
    return await prisma.clientWaitList.delete({
        where: { client_wait_id: parseInt(id) },
    });
};

const updateClientWaitList = async (id, updates) => {
    return await prisma.clientWaitList.update({
        where: { client_wait_id: parseInt(id) },
        data: updates,
    });
};




export default {
    createClientWaitList,
    getClientWaitLists,
    getClientWaitListsById,
    deleteClientWaitList,
    updateClientWaitList,

};
