import eventReviewService from '../services/event-reviews.service.js';


const createEventReview = async (req, res) => {
    const { event_id, message, rating } = req.body;

    try {
        const eventReview = await eventReviewService.createEventReview({
            event_id,
            message,
            rating,
        });
        res.status(201).json(eventReview);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create event review' });
    }
};


const createManyEventReviews = async (req, res) => {
    const { EventReviewsData } = req.body;
    try {
        const newEventReviews = await Promise.all(
            EventReviewsData.map(EventReview =>
                eventReviewService.createEventReview(EventReview)
            )
        );
        res.json(newEventReviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create many EventReviews' });
    }
};

const getEventReviews = async (req, res) => {

    try {
        const eventReviews = await eventReviewService.getAllEventReviews();
        res.status(200).json(eventReviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get event reviews' });
    }
}

const getEventReviewsById = async (req, res) => {
    const id = req.params.id;
    try {
        const EventReview = await eventReviewService.getEventReviewsById(parseInt(id));
        if (EventReview) {
            res.status(200).json(EventReview);
        } else {
            res.status(404).json({ error: `EventReview with ID ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteEventReviewById = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedEventReview = await eventReviewService.deleteEventReviewById(parseInt(id));
        if (deletedEventReview) {
            res.json(deletedEventReview);
        } else {
            res.status(404).json({ error: `EventReview with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const updateEventReview = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        const updatedEventReview = await eventReviewService.updateEventReview(id,updates);

        if (updatedEventReview) {
            res.json(updatedEventReview);
        } else {
            res.status(404).json({ error: `Event review with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};




export default {
    createEventReview,
    getEventReviews,
    getEventReviewsById,
    createManyEventReviews,
    deleteEventReviewById,
    updateEventReview
};

