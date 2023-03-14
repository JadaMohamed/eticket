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
        where: { order_id: parseInt(id) },
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

const getRecentOrdersByOrganizer = async (id) => {
    const orders = await prisma.orders_Cart.findMany({
        where: { org_id: parseInt(id) },
        orderBy: {
            Ordered_at: 'desc', // Order by the Ordered_at field in descending order to get the most recent orders first
        },
        take: 10, // Limit the results to the 10 most recent orders
        include: {
            Client: {
                select: {
                    // client_id: true,
                    Account: {
                        select: {
                            first_name: true,
                            last_name: true,
                            email: true,
                            avatar: true,  
                        }
                    }
                },
            },
        },
    });

    return orders;
}

export default {
    createOrder,
    getAllOrders,
    getOrderById,
    deleteOrdersCarttById,
    updateOrdersCart,
    getRecentOrdersByOrganizer
};
