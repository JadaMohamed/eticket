import eventImagesService from '../services/event-images.service.js';

const createEventImage = async (req, res) => {
    const {
        event_id,
        img_url
    } = req.body;

    try {
        const newEventImage = await eventImagesService.createEventImage({event_id, img_url});
        res.json(newEventImage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create event image' });
    }
};


const createManyEventImage = async (req, res) => {
    const { EventImagesData } = req.body;
    try {
        const newEventImages = await Promise.all(
            EventImagesData.map(EventImage =>
                eventImagesService.createEventImage(EventImage)
            )
        );
        res.json(newEventImages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create EventImages' });
    }
};

const getAllEventImages = async (req, res) => {
    try {
        const eventImages = await eventImagesService.getAllEventImages();
        res.status(200).json(eventImages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getImageById = async (req, res) => {
    const  imgId  = req.params.id;
    try {
        const image = await eventImagesService.getImageById(parseInt(imgId));
        if (image) {
            res.status(200).json(image);
        } else {
            res.status(404).json({ error: `image with ID ${imgId} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteImageById = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedImage = await eventImagesService.deleteImageById(parseInt(id));
        if (deletedImage) {
            res.json(deletedImage);
        } else {
            res.status(404).json({ error: `Image with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const updateEventImage = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        const updatedEventImage = await eventImagesService.updateEventImage(id, updates);

        if (updatedEventImage) {
            res.json(updatedEventImage);
        } else {
            res.status(404).json({ error: `Event image with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};




export default {
    createEventImage,
    getAllEventImages,
    getImageById,
    createManyEventImage,
    deleteImageById,
    updateEventImage,

};
