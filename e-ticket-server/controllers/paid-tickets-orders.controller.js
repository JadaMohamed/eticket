import PaidTicketsOrdersService from '../services/paid-tickets-orders.service.js';

const createPaidTicketOrder = async (req, res) => {
    const { order_id, ticket_id, event_id } = req.body;

    try {
        const newPaidTicketOrder = await PaidTicketsOrdersService.createPaidTicketOrder({order_id, ticket_id, event_id});
        res.json(newPaidTicketOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create paid ticket order' });
    }
};


const createManyPaidTicketOrder = async (req, res) => {
    const { PaidTicketOrdersData } = req.body;
    try {
        const newPaidTicketOrders = await Promise.all(
            PaidTicketOrdersData.map(PaidTicketOrder =>
                PaidTicketsOrdersService.createPaidTicketOrder(PaidTicketOrder)
            )
        );
        res.json(newPaidTicketOrders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create many Paid Ticket Orders' });
    }
};


const getAllPaidTicketOrders = async (req, res) => {
    try {
        const paidTicketOrders = await PaidTicketsOrdersService.getAllPaidTicketOrders();
        res.status(200).json(paidTicketOrders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPaidTicketOrdersByEventId = async (req, res) => {
     const {eventId}=req.params;
    try {
        const paidTicketOrders = await PaidTicketsOrdersService.getPaidTicketOrdersByEventId(eventId);
        res.status(200).json(paidTicketOrders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deletePaidTicketsOrderById = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedPaidTicketsOrder = await PaidTicketsOrdersService.deletePaidTicketsOrderById(parseInt(id));
        if (deletedPaidTicketsOrder) {
            res.json(deletedPaidTicketsOrder);
        } else {
            res.status(404).json({ error: `PaidTicketsOrder with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePaidTicketsOrder = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedPaidTicketsOrder = await PaidTicketsOrdersService.updatePaidTicketsOrder(id, updates);

        if (updatedPaidTicketsOrder) {
            res.json(updatedPaidTicketsOrder);
        } else {
            res.status(404).json({ error: `Paid tickets order with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export default {
    createPaidTicketOrder,
    getAllPaidTicketOrders,
    getPaidTicketOrdersByEventId,
    createManyPaidTicketOrder,
    deletePaidTicketsOrderById,
    updatePaidTicketsOrder,
};
