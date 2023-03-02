import clientService from '../services/client.service.js';

const createClient = async (req, res) => {
    const {
        first_name,
        last_name,
        address,
        country,
        account_id,
        city
    } = req.body;

    try {
        const newClient = await clientService.createClient({ first_name, last_name, address, country, account_id, city });
        res.json(newClient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create client' });
    }
};


const createManyClients = async (req, res) => {
    const { ClientsData } = req.body;
    try {
        const newClients = await Promise.all(
            ClientsData.map(Client =>
                clientService.createClient(Client)
            )
        );
        res.json(newClients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create Clients' });
    }
};

const getAllClients = async (req, res) => {
    try {
        const clients = await clientService.getAllClients();
        res.status(200).json(clients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getClientById = async (req, res) => {
    const { clientId } = req.params;

    try {
        const client = await clientService.getClientById(parseInt(clientId));
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ error: `client with ID ${clientId} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteClienById = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedClient = await clientService.deleteClienById(parseInt(id));

        if (deletedClient) {
            res.json(deletedClient);
        } else {
            res.status(404).json({ error: `Client with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updateClient = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedClient = await clientService.updateClient(id, updates);

        if (updatedClient) {
            res.json(updatedClient);
        } else {
            res.status(404).json({ error: `Client with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export default {
    createClient,
    getAllClients,
    createManyClients,
    getClientById,
    deleteClienById,
    updateClient,

};
