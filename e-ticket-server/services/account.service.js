import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



const createAccount = async (data) => {
    return await prisma.account.create({ data });
};

const getAccountById = async (id) => {
    return await prisma.account.findUnique({
        where: { account_id: parseInt(id) },
        // include: {
        //     Admin: true,
        //     Notifications: true,
        //     Organizer: true,
        // }
    });
};

const getAccountByEmail = async (email) => {
    return await prisma.account.findUnique({
        where: { email }
    });
};

const updateAccount = async (id, updates) => {
    return await prisma.account.update({
        where: { account_id: parseInt(id) },
        data: updates
    });
};



const deleteAccount = async (id) => {
    return await prisma.account.delete({
        where: { account_id: parseInt(id) },
    });
};

const getAllAccounts = async () => {
    return await prisma.account.findMany({
        include: {
            Admin: true,
            Notifications: true,
            Organizer: true,
        }
    });
};


const findAccountByEmailAndPassword = async (email, password) => {
    const account = await prisma.account.findUnique({
        where: {
            email,
        },
    });

    if (!account) {
        return null;
    }

    if (account.password !== password) {
        return null;
    }
    return account;
};

const findAccountByEmail = async (email) => {
    const account = await prisma.account.findUnique({
        where: {
            email,
        },
    });

    if (!account) {
        return null;
    }

    return account;
};
async function findAccountByFirstLastName(firstName, lastName) {
    const account = await prisma.account.findUnique({
        where: {
            first_name_last_name: {
                first_name: firstName,
                last_name: lastName,
            },
        },
    })
    return account
}
async function findAccountByPhone(phone_number) {
    const account = await prisma.account.findUnique({
        where: {
            phone_number,
        },
    });
    return account
}

async function getAccountsStats(timeframe) {
    let query;
    let startDate;
    switch (timeframe) {
        case "lifetime":
            query = {
                select: {
                    created_at: true,
                    account_type: true,
                },
            }
            break;
        case "last30days":
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
            query = {
                select: {
                    created_at: true,
                    account_type: true,
                },
                where: {
                    created_at: { gte: startDate }
                }
            }
            break;
        default:
            throw new Error(
                `Invalid timeframe: ${timeframe}, with typeof: ${typeof timeframe}`
            );
    }
    const accounts = await prisma.account.findMany(query)

    const data = {}

    accounts.forEach((account) => {
        const date = account.created_at.toDateString()

        if (!data[date]) {
            data[date] = {
                client: 0,
                organizer: 0,
            }
        }

        if (account.account_type === 'client') {
            data[date].client++
        } else if (account.account_type === 'organizer') {
            data[date].organizer++
        }
    })

    return data
}

export default {
    createAccount,
    getAccountById,
    getAccountByEmail,
    updateAccount,
    deleteAccount,
    getAllAccounts,
    findAccountByEmailAndPassword,
    findAccountByEmail,
    findAccountByFirstLastName,
    findAccountByPhone,
    getAccountsStats
};
