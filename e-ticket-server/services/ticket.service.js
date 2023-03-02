import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const createTicket = async (data) => {
    const newTicket = await prisma.ticket.create({data, });
    return newTicket;
};

const getTicketsByClientId = async (clientId) => {
    const tickets = await prisma.ticket.findMany({
        where: { client_id: Number(clientId) },
        // include: { Event: true },
    });

    return tickets;
};

const getAllTickets = async () => {
    return prisma.ticket.findMany({
        include:{
            Paid_Tickets_Orders:true,
        }
    });
};

const deleteticketById = async (id) => {
    return await prisma.ticket.delete({
        where: { ticket_id: id },
    });
};

const updateTicket = async (id, updates) => {
    return await prisma.ticket.update({
        where: { ticket_id: parseInt(id) },
        data: updates
    });
};

export default {
    createTicket,
    getTicketsByClientId,
    getAllTickets,
    deleteticketById,
    updateTicket,
};
