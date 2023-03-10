import userService from '../services/user.service.js';
import accountService from '../services/account.service.js';
import validator from 'validator';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import organizersService from '../services/organizers.service.js';
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
        }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });

        // Set JWT as a cookie in the response
        res.cookie('eticketjwt', eticketjwt, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 2 * 1000, // 2 days
            sameSite: 'None',
            path: '/',
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
        }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });

        // Set JWT as a cookie in the response
        res.cookie('eticketjwt', eticketjwt, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 2 * 1000, // 2 days
            sameSite: 'None',
            path: '/',
        }).status(200).json({ profile });
    } catch (error) {
        // next(error);
        console.error(error);
        res.status(500).json({ error: 'Server error to login' });
    }
};

const logout = async (req, res, next) => {
    try {
        // Clear authentication cookie
        res.clearCookie('eticketjwt', {
            httpOnly: true,
        });
        res.status(200).json({ message: 'user logout successfully' });

    } catch (error) {
        next(error);
    }
}



const profile = async (req, res, next) => {
    try {
        // console.log(req.user)

        const account = await accountService.getAccountById(req.user.accountId);
        // console.log('account')
        // console.log(account)
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


const registerOrganizer = async (req, res, next) => {
    const { first_name, last_name, email, city, avatar, phone_number, password, confirmPassword, Description, Instagram, Facebook, Twitter } = req.body;


    // Validate input data
    const errors = [];
    // if (!account_type || !['admin', 'organizer', 'client'].includes(account_type)) {
    //     errors.push('Invalid account type');
    // }
    if (!first_name) {
        errors.push('First name is required');
    }
    if (!last_name) {
        errors.push('Last name is required');
    }
    if (!email || !validator.isEmail(email)) {
        errors.push('Invalid email');
    }
    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }
    if (password !== confirmPassword) {
        errors.push('Password and confirmPassword are not mach');
    }
    if (!phone_number || !validator.isMobilePhone(phone_number, 'any')) {
        errors.push('Invalid phone number');
    }
    if (city && !validator.isAscii(city)) {
        errors.push('Invalid city');
    }
    if (avatar && !validator.isURL(avatar)) {
        errors.push('Invalid avatar URL');
    }
    if (Description && !validator.isAscii(Description)) {
        errors.push('Invalid description');
    }
    if (Instagram && !validator.isURL(Instagram)) {
        errors.push('Invalid Instagram URL');
    }
    if (Facebook && !validator.isURL(Facebook)) {
        errors.push('Invalid Facebook URL');
    }
    if (Twitter && !validator.isURL(Twitter)) {
        errors.push('Invalid Twitter URL');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Check if user with same email and password exists
    const existingAccount = await accountService.findAccountByEmailAndPassword(email, password);
    if (existingAccount) {
        return res.status(400).json({ errors: ['User with this email and password already exists'] });
    }
   
    const existingAccountByPhone = await accountService.findAccountByPhone(phone_number);
    if (existingAccountByPhone) {
        return res.status(400).json({ errors: ['User with this Phone Number already exists'] });
    }

    try {
        // create account
        const account = await accountService.createAccount({ first_name, last_name, email, password, account_type: 'organizer', avatar, phone_number });
        if (!account) {
            return res.status(400).json({ msg: "account not created correctly" })
        }
        // create organizer
        const account_id = account.account_id;
        const organizer = await organizersService.createOrganizer({ account_id, Instagram, Facebook, Twitter, Description, city });
        if (!organizer) {
            return res.status(400).json({ msg: "Organizer not created correctly" })
        }
        
        // create profile object
        const profile = {
            account: { ...account },
            organizer: { ...organizer }
        };

        // generate JWT
        const eticketjwt = jwt.sign({
            accountId: account.account_id,
            userType: account.account_type
        }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });

        // Set JWT as a cookie in the response
        res.cookie('eticketjwt', eticketjwt, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 2 * 1000, // 2 days
            sameSite: 'None',
            path: '/',
        }).status(201).json({ profile });
    } catch (error) {
        if (error.code === '23505') {
            // Unique constraint violation
            return res.status(400).json({ errors: ['Email or phone number is already in use'] });
        }
        next(error);
    }
};






export default { register, login, profile, logout, registerOrganizer };
