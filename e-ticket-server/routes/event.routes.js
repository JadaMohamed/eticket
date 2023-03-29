import express from "express";
import eventController from "../controllers/event.controller.js";
import {
  verifyAdmin,
  verifyJwt,
  verifyOrganizerOrAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();
router.post(
  "/create/:orgId",
  verifyJwt,
  verifyOrganizerOrAdmin,
  eventController.createOrganizerEvent
);
router.get("/:id", eventController.getEventById);
router.get(
  "/organizer/:orgId/all-events",
  eventController.getAllOrganizerEvents
);
router.get(
  "/organizer-profile/:orgId",
  eventController.getOrganizerProfileById
);
router.post(
  "/",
  verifyJwt,
  verifyOrganizerOrAdmin,
  eventController.createEvent
);
router.post("/many", verifyJwt, verifyAdmin, eventController.createManyEvent);
router.post("/search", eventController.searchEvents);
router.get("/", eventController.getAllEvents);
router.get("/allcategory", eventController.getAllEventsCategories);
router.get("/topsalesevents", eventController.getTopSalesEvents); //I did not find the controller
router.delete(
  "/:id",
  verifyJwt,
  verifyOrganizerOrAdmin,
  eventController.deleteEventById
);
router.put(
  "/:id",
  verifyJwt,
  verifyOrganizerOrAdmin,
  eventController.updateEvent
);
router.get(
  "/organizer/:orgId/last-three",
  verifyJwt,
  verifyOrganizerOrAdmin,
  eventController.getLastThreeEventsForOrganizer
);

router.get("/organizer/get-event-sales/:orgId", eventController.getEventSales);
router.get(
  "/organizer/get-ticket-sales/:eventId",
  eventController.getTicketsSales
);
router.get(
  "/organizer/get-event-sales-seats/:orgId",
  eventController.getEventSalesPerSeatCategory
);
export default router;

// import express from 'express';
// import {
//     // getAllEvents,
//     // getEvent,
//     createEvent,
//     // deleteEvent,
//     // updateEvent,
// } from '../controllers/event.controller.js';

// const router = express.Router();

// router
//     // .get('/', getAllEvents)
//     // .get('/:id', getEvent)
//     .post('/', createEvent)
//     // .delete('/:id', deleteEvent)
//     // .patch('/:id', updateEvent);

// export default router;
