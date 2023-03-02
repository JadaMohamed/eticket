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




export default {
    createAdmin,
    getAdminById,
    getAllAdmins,
    deleteAdmin,
    createManyAdmins,
    updateAdmin
};
