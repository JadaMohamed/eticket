import userService from '../services/user.service.js';
import accountService from '../services/account.service.js';
import validator from 'validator';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// // Import cookie package
// import cookie from 'cookie';





const register = async (req, res, next) => {
    const { email, password, account_type, first_name, last_name, phone_number } = req.body;


    // Validate input data
    const errors = [];
    if (!email || !validator.isEmail(email)) {
        errors.push('Invalid email');
    }
    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }
    if (!account_type || !['admin', 'organizer', 'client'].includes(account_type)) {
        errors.push('Invalid account type');
    }
    if (!first_name || !last_name) {
        errors.push('First and last name are required');
    }
    if (phone_number && !validator.isMobilePhone(phone_number, 'any')) {
        errors.push('Invalid phone number');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Check if user with same email and password exists
    const existingAccount = await accountService.findAccountByEmailAndPassword(email, password);
    if (existingAccount) {
        return res.status(400).json({ errors: ['User with this email and password already exists'] });
    }

    try {
        // create account
        const account = await accountService.createAccount({ first_name, last_name, email, password, account_type, phone_number });

        // create user
        const user = await userService.createUser(account.account_id, account_type);
        if (!user) {
            return res.status(400).json({ msg: "user not created correctly" })
        }

        // generate JWT
        const eticketjwt = jwt.sign({
            accountId: account.account_id,
            userType: account.account_type
        }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

        // Set JWT as a cookie in the response
        res.cookie('eticketjwt', eticketjwt, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            // maxAge: 60 * 60 * 24 * 10 , 
            // sameSite: 'strict',
            // path: '/',
        }).status(201).json({ account });
    } catch (error) {
        if (error.code === '23505') {
            // Unique constraint violation
            return res.status(400).json({ errors: ['Email or phone number is already in use'] });
        }
        next(error);
    }
};



const login = async (req, res, next) => {
    const { email, password } = req.body;

    // Validate input data
    const errors = [];
    if (!email || !validator.isEmail(email)) {
        errors.push('Invalid email');
    }
    if (!password || password.length < 6) {
        errors.push('Invalid password');
    }
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        // Find user by email and password
        const profile = await userService.findAccountByEmailAndPassword(email, password);
        if (!profile) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // generate JWT
        const eticketjwt = jwt.sign({
            accountId: profile.account.account_id,
            userType: profile.account.account_type
        }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

        // Set JWT as a cookie in the response
        res.cookie('eticketjwt', eticketjwt, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 2 * 1000,//2days 
            sameSite: 'strict',
            path: '/',
        }).status(201).json({ profile });
    } catch (error) {
        // next(error);
        console.error(error);
        res.status(500).json({ error: 'Server error to login' });
    }
};

const logout = async (req, res, next) => {
    try {
        console.log(req.user)
        // generate JWT
        const eticketjwt = jwt.sign({
            // accountId: req.user.accountId
        }, process.env.JWT_SECRET_KEY, { expiresIn: '2s' });

        // Set JWT as a cookie in the response
        res.clearCookie('eticketjwt', eticketjwt, {
            httpOnly: true,
            // maxAge: 9000,
        }).status(200).json({ message: 'user logout seccessufy' });

    } catch (error) {
        next(error);
    }

}


const profile = async (req, res, next) => {
    try {
        console.log(req.user)

        const account = await accountService.getAccountById(req.user.accountId);
        console.log('account')
        console.log(account)
        if (!account) {
            return res.status(401).json({ error: 'Invalid virifecation to get account' });
        }


        // Find user by email and password
        const profile = await userService.findAccountByEmailAndPassword(account.email, account.password);
        if (!profile) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }


        res.status(200).json({ profile });

    } catch (error) {
        next(error);
    }


}





export default { register, login, profile, logout };
