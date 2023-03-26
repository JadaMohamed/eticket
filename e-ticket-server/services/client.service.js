import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createClient = async (data) => {
    return prisma.client.create({data});
};

const getAllClients = async () => {
    return prisma.client.findMany({
        include:{
            ClientWaitList:true,
            // Orders_Cart:true,
        }
    });
};


const getClientById = async (client_id) => {
    return prisma.client.findUnique({
        where: { client_id },
        include: {
            ClientWaitList: true,
            Orders_Cart: true,
        }
    });
};


const deleteClienById = async (id) => {
    return await prisma.client.delete({
        where: { client_id: id },
    });
};


const updateClient = async (id, updates) => {
    return await prisma.client.update({
        where: { client_id: parseInt(id) },
        data: updates
    });
};

const getClientAccountInformations = async (clientId) => {
    const clientInfo = await prisma.client.findUnique({
      where: { client_id: clientId },
      include: {
        Account: true,
      }
    });
    return clientInfo;
  }

export default {
    createClient,
    getAllClients,
    getClientById,
    deleteClienById,
    updateClient,
    getClientAccountInformations
};
