import notificationsService from '../services/notifications.service.js';

const createNotification = async (req, res) => {
    const {
        account_id,
        not_message
    } = req.body;

    try {
        const newNotification = await notificationsService.createNotification({account_id, not_message});
        res.json(newNotification);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create notification' });
    }
};

const createManyNotifications = async (req, res) => {
    const {notificationsData} = req.body;
    try {
        const newNotifications = await Promise.all(
            notificationsData.map(notification =>
                notificationsService.createNotification(notification)
            )
        );
        res.json(newNotifications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create notifications' });
    }
};


const getAllNotifications = async (req, res) => {
    try {
        const notifications = await notificationsService.getAllNotifications();
        res.status(200).json(notifications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getNotificationsByAccountId = async (req, res) => {
    const id = req.params.accountId;
    try {
        const Notification = await notificationsService.getNotificationsByAccountId(parseInt(id));
        if (Notification) {
            res.json(Notification);
        } else {
            res.status(404).json({ error: `Notification with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};




const deleteNotificationById = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedNotification = await notificationsService.deleteNotificationById(parseInt(id));
        if (deletedNotification) {
            res.json(deletedNotification);
        } else {
            res.status(404).json({ error: `Notification with id ${id} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updateNotifications = async (req, res) => {
    try {
        const { id } = req.params;
        const { not_message } = req.body;

        const updatedNotifications = await notificationsService.updateNotifications(id, not_message);

        res.status(200).json(updatedNotifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default {
    createNotification,
    getAllNotifications,
    getNotificationsByAccountId,
    createManyNotifications,
    deleteNotificationById,
    updateNotifications,
};
