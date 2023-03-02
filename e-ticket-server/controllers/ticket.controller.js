import ticketService from '../services/ticket.service.js';

const createTicket = async (req, res) => {
    const {
        client_id,
        event_id,
        qrcode,
        ticket__type_id,
        num_uses,
    } = req.body;

    try {
        const newTicket = await ticketService.createTicket({
            client_id,
            event_id,
            qrcode,
            ticket__type_id,
            num_uses,
        });

        res.json(newTicket);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create ticket' });
    }
};

const createManyTicket = async (req, res) => {
    const { TicketsData } = req.body;
    try {
        const newTickets = await Promise.all(
            TicketsData.map(ticket =>
                ticketService.createTicket(ticket)
            )
        );
        res.json(newTickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create many Tickets' });
    }
};

const getTicketsByClientId = async (req, res) => {
    const { clientId } = req.params;

    try {
        const tickets = await ticketService.getTicketsByClientId(clientId);

        res.json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getAllTickets();
        res.status(200).json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error to get all tickets' });
    }
};

const deleteticketById = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedteticket = await ticketService.deleteticketById(parseInt(id));
        if (deletedteticket) {
            res.json(deletedteticket);
        } else {
            res.status(404).json({ error: `teticket with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateTicket = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedTicket = await ticketService.updateTicket(id, updates);

        if (updatedTicket) {
            res.json(updatedTicket);
        } else {
            res.status(404).json({ error: `Ticket with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export default {
    createTicket,
    getTicketsByClientId,
    createManyTicket,
    getAllTickets,
    deleteticketById,
    updateTicket,
    
};
