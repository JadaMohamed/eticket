import express from 'express';
import ordersCartController from '../controllers/orders-cart.controller.js';

const router = express.Router();
router.post('/add-to-cart', ordersCartController.addToCart);
router.post('/', ordersCartController.createOrder);
router.post('/many', ordersCartController.createManyOrder);
router.post('/pay-orders/:clientId', ordersCartController.createOrdersPayment);
router.get('/', ordersCartController.getAllOrders);
router.get('/:orders_Cart_id', ordersCartController.getOrderById);
router.get('/organizer/:orgId/recent', ordersCartController.getRecentOrdersByOrganizer);
router.get('/organizer/:orgId/all', ordersCartController.getAllOrdersByOrganizer);
router.get('/not-paid/client/:clientId', ordersCartController.getClientNonPaidOrders);
router.post('/delete-many', ordersCartController.deleteManyOrdersCarttById);
router.delete('/:id', ordersCartController.deleteOrdersCarttById);
router.put('/:order_id', ordersCartController.updateOrdersCart);


export default router;
