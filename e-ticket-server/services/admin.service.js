import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createAdmin = async (data) => {
    return prisma.admin.create({data});
};

const getAdminById = async (id) => {
    return await prisma.admin.findUnique({
        where: { ad_id: id },
        include: { Account: true }
    });
};

const getAllAdmins = async () => {
    return prisma.admin.findMany();
};


const deleteAdmin = async (id) => {
    return await prisma.admin.delete({
        where: { ad_id: id },
    });
};


const updateAdmin = async (id, updates) => {
    return await prisma.admin.update({
        where: { ad_id: parseInt(id) },
        data: updates,
    });
};




export default {
    createAdmin,
    getAdminById,
    getAllAdmins,
    deleteAdmin,
    updateAdmin,
};
