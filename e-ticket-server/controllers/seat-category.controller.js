import seatCategoryService from '../services/seat-category.service.js';

const createSeatCategory = async (req, res) => {
    const {
        event_id,
        type_name,
        type_price,
        type_description,
        number_max,
        number_avialable,
        max_uses
    } = req.body;

    try {
        const newSeatCategory = await seatCategoryService.createSeatCategory({event_id, type_name, type_price, type_description, number_max, number_avialable, max_uses});
        res.json(newSeatCategory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create seat category' });
    }
};


const createManySeatCategory = async (req, res) => {
    const { SeatCategorysData } = req.body;
    try {
        const newSeatCategorys = await Promise.all(
            SeatCategorysData.map(SeatCategory =>
                seatCategoryService.createSeatCategory(SeatCategory)
            )
        );
        res.json(newSeatCategorys);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create SeatCategorys' });
    }
};




const getAllSeatCategories = async (req, res) => {
    try {
        const seatCategories = await seatCategoryService.getAllSeatCategories();
        res.status(200).json(seatCategories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSeatCategorieById = async (req, res) => {
    const id = req.params.id;
    try {
        const SeatCategorie = await seatCategoryService.getSeatCategorieById(parseInt(id));
        if (SeatCategorie) {
            res.status(200).json(SeatCategorie);
        } else {
            res.status(404).json({ error: `SeatCategorie with ID ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteSeatCategoryById = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedSeatCategory = await seatCategoryService.deleteSeatCategoryById(parseInt(id));
        if (deletedSeatCategory) {
            res.json(deletedSeatCategory);
        } else {
            res.status(404).json({ error: `SeatCategory with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateSeatCategory = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedSeatCategory = await seatCategoryService.updateSeatCategory(id, updates);

        if (updatedSeatCategory) {
            res.json(updatedSeatCategory);
        } else {
            res.status(404).json({ error: `Seat category with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getEventCategories = async (req, res) => {
    const id = req.params.id;

    try {
        const eventCategories = await seatCategoryService.getEventCategories(id);

        if(eventCategories) {
            res.json(eventCategories);
        } else {
            res.status(404).json({ error: `Event with id: ${id} seat categories not found`});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default {
    createSeatCategory,
    getAllSeatCategories,
    createManySeatCategory,
    getSeatCategorieById,
    deleteSeatCategoryById,
    updateSeatCategory,
    getEventCategories
};
