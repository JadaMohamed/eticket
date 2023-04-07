import adminService from '../services/admin.service.js';

const createAdmin = async (req, res) => {
    const { first_name, last_name, account_id } = req.body;

    try {
        const newAdmin = await adminService.createAdmin({first_name, last_name, account_id});
        res.json(newAdmin);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create admin' });
    }
};



const createManyAdmins = async (req, res) => {
    const { AdminsData } = req.body;
    try {
        const newAdmins = await Promise.all(
            AdminsData.map(Admin =>
                adminService.createAdmin(Admin)
            )
        );
        res.json(newAdmins);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create many Admins' });
    }
};

const getAdminById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const admin = await adminService.getAdminById(id);

        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getAllAdmins = async (req, res) => {
    try {
        const Admins = await adminService.getAllAdmins();
        res.status(200).json(Admins);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error geting all Admins' });
    }
};


const deleteAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedAdmin = await adminService.deleteAdmin(parseInt(id));
        console.log('--------------------')
        console.log(deletedAdmin)

        if (deletedAdmin) {
            res.json(deletedAdmin);
        } else {
            res.status(404).json({ error: `Admin with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updateAdmin = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const updatedAdmin = await adminService.updateAdmin(id, data);

        if (updatedAdmin) {
            res.json(updatedAdmin);
        } else {
            res.status(404).json({ error: `Admin with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getTotalUsers= async(req,res)=>{
    try{
        const Users=await adminService.getTotalUsers();
        res.status(200).json(Users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error Canot get users' });
    }

}
const getTotalActive= async(req,res)=>{
    try{
        const Users=await adminService.getTotalActive();
        res.status(200).json(Users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error Canot get users' });
    }

}

const getJoinedLastWeek= async(req,res)=>{
    try{
        const joined=await adminService.getJoinedLastWeek();
        res.status(200).json(joined);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error Canot get users' });
    }

}
const getEventsStats=async(req, res)=>{
    try{
        const eventsStats=await adminService.getEventsStats();
        res.status(200).json(eventsStats);
    }
    catch (err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error Canot get Events Stats' });
    }
}

const getLastJoinedUsers=async(req,res)=>{
    try{
        const users=await adminService.getLastJoinedUsers();
        res.status(200).json(users);
    }
    catch (err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error Canot get last 10 joined' });
    }
}

const getAllUsers=async(req, res)=>{
    try{
        const users=await adminService.getAllUsers();
        res.status(200).json(users);
    }
    catch (err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error Canot get users list' });
    }
}

export default {
    createAdmin,
    getAdminById,
    getAllAdmins,
    deleteAdmin,
    createManyAdmins,
    updateAdmin,
    getTotalUsers,
    getJoinedLastWeek,
    getEventsStats,
    getLastJoinedUsers,
    getAllUsers,
    getTotalActive
};
