import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createNotification = async (data) => {
    return  prisma.notifications.create({ data, });
};

const getAllNotifications = async () => {
    return prisma.notifications.findMany();
};



const getNotificationsByAccountId = async (id) => {
    return await prisma.notifications.findMany({
        where: { account_id: id },
    });
};


const deleteNotificationById = async (id) => {
    return await prisma.notifications.delete({
        where: { not_id: id },
    });
};


const updateNotifications = async (id, not_message) => {
    return await prisma.notifications.update({
        where: { not_id: parseInt(id) },
        data: { not_message }
    });
};



export default {
    createNotification,
    getAllNotifications,
    getNotificationsByAccountId,
    deleteNotificationById,
    updateNotifications
};
