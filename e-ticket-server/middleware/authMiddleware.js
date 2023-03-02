import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const verifyJwt = (req, res, next) => {
    const eticketjwt = req.cookies.eticketjwt;
    // console.log(' ----------------------verifyJwt------------------------ ')
    // console.log(req.cookies)
    // console.log("eticketjwt:", eticketjwt)

    if (!eticketjwt) {
        return res.status(401).json({ error: 'Authorization eticket (jwt) not found' });
    }

    try {
        const decoded = jwt.verify(eticketjwt, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        // console.log('verifyJwt: decoded', decoded);
        next();
    } catch (error) {
        // console.log(error) this is where I test to hack this api by generating token with infor at jwt.io site
        return res.status(401).json({ error: 'Invalid authorization eticketjwt' });
    }
};


// const verifyJwt = (req, res, next) => {
//     const eticketjwt = req.headers.authorization?.split(' ')[1];

//     if (!eticketjwt) {
//         return res.status(401).json({ error: 'Authorization eticket (jwt) not found' });
//     }

//     try {
//         const decoded = jwt.verify(eticketjwt, process.env.JWT_SECRET_KEY);
//         req.user = decoded;
//         console.log('verifyJwt: decoded', decoded)
//         next();
//     } catch (error) {
//         return res.status(401).json({ error: 'Invalid authorization eticketjwt' });
//     }
// };

const verifyUserType = (...userTypes) => (req, res, next) => {
    const userType = req.user.userType;

    if (!userType || !userTypes.includes(userType)) {
        return res.status(401).json({ error: `Access denied Only ${userTypes.join(' and ')} has permission` });
    }

    next();
};

const verifyAdmin = verifyUserType('admin');
const verifyOrganizerOrAdmin = verifyUserType('admin', 'organizer');
const verifyClientOrAdmin = verifyUserType('admin', 'client');

export { verifyJwt, verifyAdmin, verifyOrganizerOrAdmin, verifyClientOrAdmin };
