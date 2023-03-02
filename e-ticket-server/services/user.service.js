import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const createUser = async (account_id, account_type) => {
    let user;
    // Create user based on the account type
    switch (account_type) {
        case 'admin':
            user = await prisma.admin.create({
                data: {
                    account_id,
                },
            });
            break;
        case 'organizer':
            user = await prisma.organizer.create({
                data: {
                    account_id,
                },
            });
            break;
        case 'client':
            user = await prisma.client.create({
                data: {
                    account_id,
                },
            });
            break;
        default:
            return null;

    }
    return user;
};


const findAccountByEmailAndPassword = async (email, password) => {
    const account = await prisma.account.findUnique({
        where: {
            email,
        },
        // select: {
        //     account_id: true,
        //     email: true,
        //     password: true,
        //     account_type: true,
        // },
    });

    if (!account) {
        return null;
    }

    if (account.password !== password) {
        return null;
    }

    let user;

    // find user based on the account type
    switch (account.account_type) {
        case 'admin':
            user = await prisma.admin.findUnique({
                where: {
                    account_id: account.account_id,
                },
            });
            break;
        case 'organizer':
            user = await prisma.organizer.findUnique({
                where: {
                    account_id: account.account_id,
                },
            });
            break;
        case 'client':
            user = await prisma.client.findUnique({
                where: {
                    account_id: account.account_id,
                },
            });
            break;
        default:
            return null;
    }

    if (!user) {
        return null;
    }
    console.log('----------------')
    console.log(user)
    return {account,user};
};




export default { createUser, findAccountByEmailAndPassword };
