import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const createEventReview = async (data) => {
    try {
        const newEventReview = await prisma.event_Review.create({
            data,
        });
        return newEventReview;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to create event review');
    }
};

const getAllEventReviews = async () => {
    try {
        const eventReviews = await prisma.event_Review.findMany();
        return eventReviews;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to retrieve event reviews');
    }
};

const getEventReviewsById = async (review_id) => {
    return prisma.event_Review.findUnique({
            where: { review_id },
        });
    };


const deleteEventReviewById = async (id) => {
    return await prisma.event_Review.delete({
        where: { review_id: id },
    });
};


const updateEventReview = async (id, updates) => {
    return await prisma.event_Review.update({
        where: { review_id: parseInt(id) },
        data: updates,
    });
};




export default {
    createEventReview,
    getAllEventReviews,
    getEventReviewsById,
    deleteEventReviewById,
    updateEventReview
};