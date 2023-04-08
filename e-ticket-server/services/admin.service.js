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

const getTotalUsers = async () => {
    try {
        const organizersCount = await prisma.organizer.count();
        const clientsCount = await prisma.client.count();
        return ({ organizersCount, clientsCount });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const getJoinedLastWeek= async()=>{
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    return  await prisma.account.count({
        where: {
            created_at: {
                gte: sevenDaysAgo.toISOString(),
                lt: now.toISOString()
            }
        }
  })

}

const getEventsStats=async()=>{
    const totalCount = await prisma.event.count()
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const newCount = await prisma.event.count({
        where: {
            created_at: {
                gte: oneWeekAgo,
                lt: now,
            },
        },
    })

  return {
    totalCount,
    newCount,
  }

}

const getLastJoinedUsers=async()=>{
    try {
        return await prisma.account.findMany({
          orderBy: { created_at: 'desc' },
          take: 10,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

const getAllUsers=async()=>{
    try {
        return await prisma.account.findMany({
          orderBy: { created_at: 'desc' },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}
const getTotalActive= async()=>{
        try {
          const now = new Date(); // Get the current date and time
          const threshold = new Date(now.getTime() - (5 * 60 * 1000)); // Subtract 5 minutes from the current time
            return await prisma.account.count({
            where: { last_activity: { gte: threshold } },
          });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong' });
        }
}
export default {
    createAdmin,
    getAdminById,
    getAllAdmins,
    deleteAdmin,
    updateAdmin,
    getTotalUsers,
    getJoinedLastWeek,
    getEventsStats,
    getLastJoinedUsers,
    getAllUsers,
    getTotalActive
};
