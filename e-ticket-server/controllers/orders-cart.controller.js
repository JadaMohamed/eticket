import ordersCartService from '../services/orders-cart.service.js';

const createOrder = async (req, res) => {
    const { quantity, total_price, event_id, ticket_type_id, client_id, is_paid } = req.body;

    try {
        const newOrder = await ordersCartService.createOrder({ quantity, total_price, event_id, ticket_type_id, client_id, is_paid });
        res.json(newOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
    }
};


const createManyOrder = async (req, res) => {
    const { OrdersData } = req.body;
    try {
        const newOrders = await Promise.all(
            OrdersData.map(Order =>
                ordersCartService.createOrder(Order)
            )
        );
        res.json(newOrders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create Orders' });
    }
};



const getAllOrders = async (req, res) => {
    try {
        const orders = await ordersCartService.getAllOrders();
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getOrderById = async (req, res) => {
    const orderId = req.params.orders_Cart_id;
    try {
        const Order = await ordersCartService.getOrderById(orderId);
        if (Order) {
            res.status(200).json(Order);
        } else {
            res.status(404).json({ error: `Order with ID ${orderId} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error ' });
    }
}


const deleteOrdersCarttById = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedOrdersCart = await ordersCartService.deleteOrdersCarttById(parseInt(id));
        if (deletedOrdersCart) {
            res.json(deletedOrdersCart);
        } else {
            res.status(404).json({ error: `OrdersCart with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Update orders cart
const updateOrdersCart = async (req, res) => {
    try {
        const orderId = req.params.order_id;
        const updatedData = req.body;
        const updatedOrdersCart = await ordersCartService.updateOrdersCart(orderId, updatedData);
        res.status(200).json(updatedOrdersCart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update orders cart' });
    }
};

const getRecentOrdersByOrganizer = async (req, res) => {
    const org_id = req.params.orgId;
    try {
        const recentOrders = await ordersCartService.getRecentOrdersByOrganizer(org_id);

        if (recentOrders && recentOrders.length > 0) {
            res.status(200).json(recentOrders);
        } else {
            res.status(404).json({ error: `No Orders found for organizer with ID ${org_id}` });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get recent orders' });
    }
};



export default {
    createOrder,
    createManyOrder,
    getAllOrders,
    getOrderById,
    deleteOrdersCarttById,
    updateOrdersCart,
    getRecentOrdersByOrganizer,
};
