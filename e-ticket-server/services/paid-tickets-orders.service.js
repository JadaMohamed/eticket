import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createPaidTicketOrder = async (data) => {
    return prisma.paid_Tickets_Orders.create({ data, });
};

const getAllPaidTicketOrders = async () => {
    return prisma.paid_Tickets_Orders.findMany({
        // include:{
        //     Paid_Tickets_Orders:true,
        // },
    });
}

const getPaidTicketOrdersByEventId = async (event_id) => {
    return prisma.paid_Tickets_Orders.findMany({
        where: {
            event_id: parseInt(event_id),   
        },
    });
};


const deletePaidTicketsOrderById = async (id) => {
    return await prisma.paid_Tickets_Orders.delete({
        where: { paid_orders_id: id },
    });
};

const updatePaidTicketsOrder = async (id, updates) => {
    return await prisma.paid_Tickets_Orders.update({
        where: { paid_orders_id: parseInt(id) },
        data: updates
    });
};

export default {
    createPaidTicketOrder,
    getPaidTicketOrdersByEventId,
    getAllPaidTicketOrders,
    deletePaidTicketsOrderById,
    updatePaidTicketsOrder,
};
