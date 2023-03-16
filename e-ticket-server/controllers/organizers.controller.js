import organizerService from "../services/organizers.service.js";

const createOrganizer = async (req, res) => {
  const orgData = req.body;

  try {
    const newOrganizer = await organizerService.createOrganizer(orgData);
    res.json(newOrganizer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create organizer" });
  }
};

const createManyOrganizers = async (req, res) => {
  const { OrganizersData } = req.body;
  try {
    const newOrganizers = await Promise.all(
      OrganizersData.map((Organizer) =>
        organizerService.createOrganizer(Organizer)
      )
    );
    res.json(newOrganizers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create many Organizers" });
  }
};

const getOrganizerById = async (req, res) => {
  const { org_id } = req.params;
  try {
    const organizer = await organizerService.getOrganizerById(parseInt(org_id));
    res.status(200).json(organizer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrganizerByAccountId = async (req, res) => {
  const { account_id } = req.params;
  try {
    const organizer = await organizerService.getOrganizerByAccountId(
      parseInt(account_id)
    );
    if (organizer) {
      res.status(200).json(organizer);
    } else {
      res.status(404).json({
        error: `No organizer found with this account id:${account_id}`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllOrganizers = async (req, res) => {
  try {
    const organizers = await organizerService.getAllOrganizers();
    res.status(200).json(organizers);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal server error so can't get all organizers " });
  }
};

const deleteOrganizerById = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedOrganizer = await organizerService.deleteOrganizerById(
      parseInt(id)
    );
    if (deletedOrganizer) {
      res.json(deletedOrganizer);
    } else {
      res.status(404).json({ error: `Organizer with id ${id} not found` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateOrganizer = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const updatedOrganizer = await organizerService.updateOrganizer(
      id,
      updates
    );

    if (updatedOrganizer) {
      res.json(updatedOrganizer);
    } else {
      res.status(404).json({ error: `Organizer with id ${id} not found` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  createOrganizer,
  getOrganizerById,
  getAllOrganizers,
  createManyOrganizers,
  deleteOrganizerById,
  updateOrganizer,
  getOrganizerByAccountId,
};
