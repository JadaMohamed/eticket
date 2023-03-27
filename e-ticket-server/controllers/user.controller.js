import userService from '../services/user.service.js';
import accountService from '../services/account.service.js';
import validator from 'validator';
import nodemailer from 'nodemailer'

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import organizersService from '../services/organizers.service.js';
import clientService from '../services/client.service.js';
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
        return res.status(400).json({ errors: ['User with this email already exists'] });
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
            return res.status(401).json({ errors: 'Invalid email or password' });
        }

        // generate JWT
        const eticketjwt = jwt.sign({
            accountId: profile.account.account_id,
            userType: profile.account.account_type
        }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });

        if (!profile.account.isEmailVerified) {
            const url = `${process.env.CLIENT_URL}/verify-email/${eticketjwt}`;
            const text = `Hi ${profile.account.first_name}, you can click the link below to verify your email:\n` + url;
            const isEmailsendSuccussfully = await sendVerificationEmail(email, "eticket verify Email", text);
            if (isEmailsendSuccussfully === true) {
                return res.status(422).json({ msg: "Please check your email inbox (and spam folder) to verify your account." });
            }
        }

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
            secure: true,
            maxAge: 2 * 1000, // 2s
            sameSite: 'None',
            path: '/',
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
        return res.status(400).json({ errors: ['User with this email already exists'] });
    }

    const existingAccountByPhone = await accountService.findAccountByPhone(phone_number);
    if (existingAccountByPhone) {
        return res.status(400).json({ errors: ['User with this Phone Number already exists'] });
    }

    try {
        // create account
        const account = await accountService.createAccount({ first_name, last_name, email, password, account_type: 'organizer', avatar, phone_number });
        if (!account) {
            return res.status(400).json({ msg: "Account not created correctly" })
        }
        // create organizer
        const account_id = account.account_id;
        const organizer = await organizersService.createOrganizer({ account_id, Instagram, Facebook, Twitter, Description, city });
        if (!organizer) {
            return res.status(400).json({ msg: "Organizer not created correctly" });
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

        //send email to resgester organizer
        const url = `${process.env.CLIENT_URL}/verify-email/${eticketjwt}`;
        const text = `Hi ${account.first_name}, you can click the link below to verify your email:\n` + url;
        const isEmailsendSuccussfully = await sendVerificationEmail(email, "eticket verify Email", text);
        if (isEmailsendSuccussfully === true) {
            return res.status(201).json({ msg: "Please check your email inbox (and spam folder) to verify your account." });
        }
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


const registerClient = async (req, res, next) => {
    const { first_name, last_name, email, city, phone_number, password, confirmPassword } = req.body;

    // Validate input data
    const errors = [];
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

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Check if user with same email and password exists
    const existingAccount = await accountService.findAccountByEmailAndPassword(email, password);
    if (existingAccount) {
        return res.status(400).json({ errors: ['User with this email already exists'] });
    }

    // Check email already in use
    const existingAccountSameEmail = await accountService.findAccountByEmail(email);
    if (existingAccountSameEmail) {
        return res.status(400).json({ errors: ['email not eccepted try use an other one'] });
    }

    const existingAccountByPhone = await accountService.findAccountByPhone(phone_number);
    if (existingAccountByPhone) {
        return res.status(400).json({ errors: ['User with this Phone Number already exists'] });
    }

    try {
        // create account
        const account = await accountService.createAccount({ first_name, last_name, email, password, account_type: 'client', phone_number });
        if (!account) {
            return res.status(400).json({ msg: "Account not created correctly" })
        }
        // console.log(account)
        // create organizer
        const account_id = account.account_id;
        const client = await clientService.createClient({ account_id, city });
        if (!client) {
            return res.status(400).json({ msg: "Client not created correctly" })
        }
        // console.log(client)
        // create profile object
        const profile = {
            account: { ...account },
            client: { ...client }
        };

        // generate JWT
        const eticketjwt = jwt.sign({
            accountId: account.account_id,
            userType: account.account_type
        }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });

        //send email to resgester client
        const url = `${process.env.CLIENT_URL}/verify-email/${eticketjwt}`;
        const text = `Hi ${account.first_name}, you can click the link below to verify your email:\n` + url;
        const isEmailsendSuccussfully = await sendVerificationEmail(email, "eticket verify Email", text);
        if (isEmailsendSuccussfully === true) {
            return res.status(201).json({ msg: "Please check your email inbox (and spam folder) to verify your account." });
        }


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


const sendVerificationEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            // secure: Boolean(process.env.SECURE),
            secureConnection: false, // TLS requires secureConnection to be false

            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("*************** email sent successfully ******************");
        return true;
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        console.log('*-----------------------------This error hapen when email failed to send-----------------------------*');
        return error;
    }
};


const verifyEmail = async (req, res) => {
    const eticketjwt = req.params.eticketjwt;

    if (!eticketjwt) {
        return res.status(401).json({ error: 'Authorization eticket (jwt) not found' });
    }

    try {
        const decoded = jwt.verify(eticketjwt, process.env.JWT_SECRET_KEY);
        // console.log('\nverifyJwt: decoded', decoded);
        const { accountId } = decoded;
        const updatedAccount = await accountService.updateAccount(accountId, { isEmailVerified: true });
        if (updatedAccount) {
            // Set JWT as a cookie in the response
            res.cookie('eticketjwt', eticketjwt, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 2 * 1000, // 2 days
                sameSite: 'None',
                path: '/',
            }).status(201).json(decoded);
        } else {
            res.status(404).json({ error: `Account with id ${accountId} not found` });
        }

    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: 'Invalid authorization eticketjwt' });
    }
};

const resetPassWord = async (req, res) => {
    const eticketjwt = req.params.eticketjwt;
    const { password, confirmPassword } = req.body;

    if (!eticketjwt) {
        return res.status(401).json({ error: 'Authorization eticket (jwt) not found' });
    }

    const errors = [];
    if (!password || !confirmPassword) {
        errors.push('both password and confirmPassword are required');
    }

    if (password.length < 8) {
        errors.push('Password must be at least 6 characters long');
    }
    if (password !== confirmPassword) {
        errors.push('Password and confirmPassword are not mach');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const decoded = jwt.verify(eticketjwt, process.env.JWT_SECRET_KEY);
        // console.log(decoded)
        // console.log('verifyJwt: decoded', decoded);
        const { accountId } = decoded;

        const updatedAccount = await accountService.updateAccount(accountId, { password: password });
        if (updatedAccount) {
            // console.log(updatedAccount)
            // Set JWT as a cookie in the response
            res.cookie('eticketjwt', eticketjwt, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 2 * 1000, // 2 days
                sameSite: 'None',
                path: '/',
            }).status(201).json(decoded);
        } else {
            res.status(404).json({ error: `Account with id ${accountId} not found` });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Invalid authorization eticketjwt' });
    }
};

const verifytoken = async (req, res) => {
    const eticketjwt = req.params.eticketjwt;

    if (!eticketjwt) {
        return res.status(401).json({ error: 'Authorization eticket (jwt) not found' });
    }
    try {
        const decoded = jwt.verify(eticketjwt, process.env.JWT_SECRET_KEY);
        // console.log(decoded)
        res.status(200).send({ msg: "correct token" });
    } catch (error) {
        return res.status(401).json({ error: 'Invalid authorization eticketjwt' });
    }
};
const sendEmailResetPassword = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ error: 'no email provided' });
    }

    try {
        const account = await accountService.getAccountByEmail(email);
        if (!account) {
            return res.status(200).json({ msg: 'If your email exists in our database, you will receive a reset password link shortly. Please check your email.' });
        }
        // generate JWT
        const eticketjwt = jwt.sign({
            accountId: account.account_id,
            userType: account.account_type
        }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });

        const url = `${process.env.CLIENT_URL}/reset-password/${eticketjwt}`;
        const text = `Hi ${account.first_name}, you can click the link below to reset your password:\n` + url;
        const isEmailsendSuccussfully = await sendVerificationEmail(email, "eticket reset password", text);
        if (isEmailsendSuccussfully === true) {
            return res.status(200).json({ msg: "If your email exists in our database, you will receive a reset password link shortly. Please check your email." });
        } else {
            return res.status(200).json({ msg: "We have a problem to send you the email try again later" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'an error shows during the process and cached.' });
    }
};




export default { register, login, profile, logout, registerOrganizer, registerClient, verifyEmail, resetPassWord, verifytoken, sendEmailResetPassword };
