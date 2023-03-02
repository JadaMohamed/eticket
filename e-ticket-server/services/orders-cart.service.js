import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createOrder = async (data) => {
    return prisma.orders_Cart.create({ data, });
};

const getAllOrders = async () => {
    return prisma.orders_Cart.findMany({
        include: {
             Event: true,
            Paid_Tickets_Orders: true,
        }
    });
};


const getOrderById = async (id) => {
    return prisma.orders_Cart.findUnique({
        where: { order_id:  parseInt(id) },
        include: {
            Event: true,
            Paid_Tickets_Orders: true,
        }
    });
};

const deleteOrdersCarttById = async (id) => {
    return await prisma.orders_Cart.delete({
        where: { order_id: id },
    });
};


const updateOrdersCart = async (orderId, updatedData) => {
    try {
        const updatedOrdersCart = await prisma.orders_Cart.update({
            where: { order_id: parseInt(orderId) },
            data: updatedData,
        });
        return updatedOrdersCart;
    } catch (err) {
        throw err;
    }
};

export default {
    createOrder,
    getAllOrders,
    getOrderById,
    deleteOrdersCarttById,
    updateOrdersCart
};
