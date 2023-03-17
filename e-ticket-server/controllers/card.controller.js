import cardService from "../services/card.service.js";

const createCard = async (req, res) => {
    try {
        const card = await cardService.createCard(req.body);
        res.status(201).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating card" });
    }
};


const createManycard = async (req, res) => {
    const { CardsData } = req.body;
    try {
        const newCards = await Promise.all(
            CardsData.map(card =>
                cardService.createCard(card)
            )
        );
        res.json(newCards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create cards' });
    }
};


const getAllCards = async (req, res) => {
    try {
        const cards = await cardService.getAllCards();
        res.status(200).json(cards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCardById = async (req, res) => {
    try {
        const card = await cardService.getCardById(req.params.id);
        if (!card) {
            res.status(404).json({ message: "Card not found" });
        } else {
            res.status(200).json(card);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting card" });
    }
};

const updateCard = async (req, res) => {
    try {
        const card = await cardService.updateCard(req.params.id, req.body);
        if (!card) {
            res.status(404).json({ message: "Card not found" });
        } else {
            res.status(200).json(card);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating card" });
    }
};

const deleteCard = async (req, res) => {
    try {
        const deleted = await cardService.deleteCard(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: "Card not found" });
        } else {
            res.status(200).json({ message: "Card deleted" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting card" });
    }
};

export default {
    createCard,
    createManycard,
    getAllCards,
    getCardById,
    updateCard,
    deleteCard,
};
