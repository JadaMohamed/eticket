import clientWaitListService from '../services/client-wait-list.service.js';

const createClientWaitList = async (req, res) => {
    const { client_id, event_id } = req.body;

    try {
        const newClientWaitList = await clientWaitListService.createClientWaitList({client_id, event_id});
        res.json(newClientWaitList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create client wait list entry' });
    }
};



const createManyClientWaitList = async (req, res) => {
    const { ClientWaitListsData } = req.body;
    try {
        const NewClientWaitLists = await Promise.all(
            ClientWaitListsData.map(ClientWaitList =>
                clientWaitListService.createClientWaitList(ClientWaitList)
            )
        );
        res.json(NewClientWaitLists);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create many Client WaitLists' });
    }
};

const getClientWaitLists = async (req, res) => {
    try {
        const clientWaitLists = await clientWaitListService.getClientWaitLists();
        res.status(200).json(clientWaitLists);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getClientWaitListsById = async (req, res) => {
    const clientWaitListId = Number(req.params.id);
    try {
        const clientWaitList = await clientWaitListService.getClientWaitListsById(clientWaitListId);
        if (clientWaitList) {
            res.status(200).json(clientWaitList);
        } else {
            res.status(404).json({ error: `clientWaitList with ID ${clientWaitListId} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteClientWaitList = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedClientWaitList = await clientWaitListService.deleteClientWaitList(id);

        if (deletedClientWaitList) {
            res.json(deletedClientWaitList);
        } else {
            res.status(404).json({ error: `ClientWaitList with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updateClientWaitList = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const updatedClientWaitList = await clientWaitListService.updateClientWaitList(id, data);

        if (updatedClientWaitList) {
            res.json(updatedClientWaitList);
        } else {
            res.status(404).json({ error: `Client waitlist with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export default {
    createClientWaitList,
    getClientWaitLists,
    createManyClientWaitList,
    getClientWaitListsById,
    deleteClientWaitList,
    updateClientWaitList,

};
