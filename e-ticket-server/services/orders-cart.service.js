import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createOrder = async (data) => {
    console.log(data);
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




const getClientNonPaidOrders = async (id) => {
    return prisma.orders_Cart.findMany({
        where: {
            client_id: parseInt(id),
            is_paid: false,
        },
        include: {
            Event: {
                include: {
                    Event_Images: true,
                }
            },
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
    const recentOrders = await prisma.orders_Cart.findMany({
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

    return recentOrders;
}
const getAllOrdersByOrganizer = async (id) => {
    const allOrders = await prisma.orders_Cart.findMany({
        where: { org_id: parseInt(id) },
        orderBy: {
            Ordered_at: 'desc',
        },
        // no Limit
        include: {
            Client: {
                select: {
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

    return allOrders;
}

export default {
    createOrder,
    getAllOrders,
    getOrderById,
    getClientNonPaidOrders,
    deleteOrdersCarttById,
    updateOrdersCart,
    getRecentOrdersByOrganizer,
    getAllOrdersByOrganizer,
};
