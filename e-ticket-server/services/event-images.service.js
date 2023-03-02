import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createEventImage = async (data) => {
    return prisma.event_Images.create({data, });
};

const getAllEventImages = async () => {
    return prisma.event_Images.findMany();
};


const getImageById = async (img_id) => {
    return prisma.event_Images.findUnique({
        where: { img_id },
    });
};


const deleteImageById = async (id) => {
    return await prisma.event_Images.delete({
        where: { img_id: id },
    });
};



const updateEventImage = async (id, updates) => {
    return await prisma.event_Images.update({
        where: { img_id: parseInt(id) },
        data: updates,
    });
};



export default {
    createEventImage,
    getAllEventImages,
    getImageById,
    deleteImageById,
    updateEventImage,

};
