import eventImagesService from "../services/event-images.service.js";
import eventService from "../services/event.service.js";
import seatCategoryService from "../services/seat-category.service.js";

const eventController = {
    getAllEvents: async (req, res) => {
        try {
            const events = await eventService.getAllEvents();
            res.status(200).json(events);
        } catch (err) {
            console.error(err);
            res
                .status(500)
                .json({ error: "Internal server error to get all event " });
        }
    },

    createEvent: async (req, res) => {
        const eventData = req.body;
        try {
            const newEvent = await eventService.createEvent(eventData);
            res.json(newEvent);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to create event" });
        }
    },
    createManyEvent: async (req, res) => {
        const { EventsData } = req.body;
        try {
            const newEvents = await Promise.all(
                EventsData.map((Event) => eventService.createEvent(Event))
            );
            res.json(newEvents);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to create many Event" });
        }
    },

    getEventById: async (req, res) => {
        const eventId = Number(req.params.id);
        try {
            const event = await eventService.getEventById(eventId);
            if (event) {
                res.status(200).json(event);
            } else {
                res.status(404).json({ error: `Event with ID ${eventId} not found` });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    deleteEventById: async (req, res) => {
        const id = req.params.id;
        try {
            const deletedEvent = await eventService.deleteEventById(parseInt(id));
            if (deletedEvent) {
                res.json(deletedEvent);
            } else {
                res.status(404).json({ error: `Event with id ${id} not found` });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    updateEvent: async (req, res) => {
        const id = req.params.id;
        const eventData = req.body;

        try {
            const updatedEvent = await eventService.updateEvent(id, eventData);

            if (updatedEvent) {
                res.json(updatedEvent);
            } else {
                res.status(404).json({ error: `Event with id ${id} not found` });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    searchEvents: async (req, res) => {
        try {
            const keyword = req.query.keyword;
            const events = await eventService.searchEvents(keyword);
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error ???");
        }
    },

    getLastThreeEventsForOrganizer: async (req, res) => {
        const orgId = Number(req.params.orgId);

        try {
            const events = await eventService.getLastThreeEventsForOrganizer(orgId);
            const eventsStats = await eventService.getOrganizerEventStats(orgId);

            if (events && events.length > 0) {
                const response = {
                    events: events,
                    eventsStats: eventsStats,
                };
                res.status(200).json(response);
            } else {
                res
                    .status(404)
                    .json({ error: `No events found for organizer with ID ${orgId}` });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getOrganizerEventStats: async (req, res) => {
        const { orgId } = req.params;
        try {
            const eventStats = await eventService.getOrganizerEventStats(orgId);
            res.status(200).json(eventStats);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getAllOrganizerEvents: async (req, res) => {
        const { orgId } = req.params;
        try {
            const events = await eventService.getAllOrganizerEvents(orgId);
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Something went wrong" });
        }
    },

    getOrganizerProfileById: async (req, res) => {
        const { org_id } = req.params;
        try {
            const organizer = await eventService.getOrganizerProfileById(org_id);
            res.status(200).json(organizer);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    searchEvents: async (req, res) => {
        try {
            const keyword = req.query.keyword;
            const events = await eventService.searchEvents(keyword);
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error ???");
        }
    },

    getLastThreeEventsForOrganizer: async (req, res) => {
        const orgId = Number(req.params.orgId);

        try {
            const events = await eventService.getLastThreeEventsForOrganizer(orgId);
            const eventsStats = await eventService.getOrganizerEventStats(orgId);

            if (events && events.length > 0) {
                const response = {
                    events: events,
                    eventsStats: eventsStats,
                };
                res.status(200).json(response);
            } else {
                res
                    .status(404)
                    .json({ error: `No events found for organizer with ID ${orgId}` });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getOrganizerEventStats: async (req, res) => {
        const { orgId } = req.params;
        try {
            const eventStats = await eventService.getOrganizerEventStats(orgId);
            res.status(200).json(eventStats);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    createOrganizerEvent: async (req, res) => {
        const { orgId } = req.params;

        //**********data from requiste for event*************//
        const eventData = {
            org_id: parseInt(orgId),
            duration: req.body.duration,
            trailer_video_url: req.body.trailer_video_url,//not
            description: req.body.description,
            brand_url: req.body.brand_url,
            location: req.body.address1 + "," + req.body.address2,
            start_time: req.body.startTime,
            finish_time: req.body.finish_time,
            //calculate the totalSeats from the table categories
            max_number_attendants: req.body.categories.reduce((acc, category) => acc + category.numSeats, 0),
            is_start_selling: req.body.is_start_selling,//not
            event_type: req.body.eventCategory,
            is_review_enabled: req.body.is_review_enabled,//not
            is_approved: req.body.is_approved,//not
            title: req.body.eventTitle,
        }

        const eventDataWithoutNullProperties = Object.entries(eventData).reduce((acc, [key, value]) => {
            if (value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {});

        //create the event to database 
        try {
            const newEvent = await eventService.createEvent(eventDataWithoutNullProperties);
            if (newEvent) {
                console.log('newEvent')
                console.log(newEvent)
                console.log('event created sucssussfly')
            }
            //get SeatCategorys from requist
            const SeatCategorys = req.body.categories.map(category => {
                return {
                    event_id: newEvent.event_id,
                    type_name: category.name,
                    type_price: category.price,
                    type_description: "description seat category",
                    number_max: category.numSeats,
                    number_avialable: category.numSeats,
                    max_uses: 1,
                };
            });
            //create categorys
            const newSeatCategorys = await Promise.all(
                SeatCategorys.map(SeatCategory =>
                    seatCategoryService.createSeatCategory(SeatCategory)
                )
            );
            //
            console.log('*************newSeatCategorys')
            console.log(newSeatCategorys)


            const Event_Images = req.body.Event_Images.map(image => {
                return {
                    event_id: newEvent.event_id,
                    img_url: image.img_url
                };
            });

            const newEventImages = await Promise.all(
                Event_Images.map(EventImage =>
                    eventImagesService.createEventImage(EventImage)
                )
            );
            //
            console.log('*******newEventImages')
            console.log(newEventImages)
            console.log('end ******************************')

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create event' });
        }
    },
};



export default eventController;

// import {eventService} from '../services/event.service.js';

// export const createEvent = async (req, res) => {
//     try {
//         const {
//             org_id,
//             duration,
//             trailer_video_url,
//             description,
//             brand_url,
//             location,
//             start_time,
//             finish_time,
//             number_sold_tickets,
//             number_of_waiters,
//             max_number_attendants,
//             is_start_selling,
//             event_type,
//             is_review_enabled,
//             is_approved
//         } = req.body;

//         const newEvent = await eventService.createEvent(
//             org_id,
//             duration,
//             trailer_video_url,
//             description,
//             brand_url,
//             location,
//             start_time,
//             finish_time,
//             number_sold_tickets,
//             number_of_waiters,
//             max_number_attendants,
//             is_start_selling,
//             event_type,
//             is_review_enabled,
//             is_approved
//         );

//         res.status(200).json({ data: newEvent });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = {
//     createEvent,
// };

// //1--Get all events
// const getAllevents = async (req, res) => {
//     try {
//         // Attempt to fetch all event documents from the database and sort them by the createdAt field in descending order
//         const events = await eventModel.find().sort({ createdAt: -1 });
//         // If the fetch is successful, return a response with a 200 status code and the events as the body
//         res.status(200).json(events);
//     } catch (error) {
//         // If an error occurs during the process, return a response with a 400 status code and the error message
//         res.status(400).json({ error: error.message });
//     }
// };

// //2--Get single event
// const getevent = async (req, res) => {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         return res.status(400).json({ error: 'Invalid event id' });
//     }
//     try {
//         const event = await eventModel.findById(req.params.id);
//         if (!event) return res.status(404).json({ error: 'event not found' });
//         res.status(200).json(event);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// //3--post a new event
// const createevent = async (req, res) => { // listen to post request on '/'

//     const { title, load, reps } = req.body // destructuring the request body to extract the title, load, and reps

//     let emptyFields = []

//     if (!title) {
//         emptyFields.push('title')
//     }
//     if (!load) {
//         emptyFields.push('load')
//     }
//     if (!reps) {
//         emptyFields.push('reps')
//     }
//     if (emptyFields.length > 0) {
//         return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
//     }

//     //add doc to db
//     try {
//         const event = await eventModel.create({ title, load, reps }) // create new event using the destructured data //i did the change from event to eventModel
//         res.status(200).json(event) // send a json response with the created event
//     } catch (error) {
//         res.status(400).json({ error: error.message }) // if there is an error during the creation, send a json response with the error message
//     }
// }

// //4-- Delete event from the database
// const deleteevent = async (req, res) => {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         return res.status(400).json({ error: 'Invalid event id' });
//     }
//     try {
//         const event = await eventModel.findByIdAndDelete(req.params.id);
//         if (!event) return res.status(404).json({ error: 'event not found' });
//         res.status(200).json({ message: 'event deleted successfully' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// //5-- Update event in the database
// const updateevent = async (req, res) => {
//     // Check if the event id passed in the request is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         // If it's not a valid id, return a response with a 400 status code and an error message
//         return res.status(400).json({ error: 'Invalid event id' });
//     }
//     try {
//         // Attempt to find and update the event document in the database using the id and data from the request
//         const event = await eventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         // If the event is not found, return a response with a 404 status code and an error message
//         if (!event) return res.status(404).json({ error: 'event not found' });
//         // If the update is successful, return a response with a 200 status code and the updated event as the body
//         res.status(200).json(event);
//     } catch (error) {
//         // If an error occurs during the process, return a response with a 400 status code and the error message
//         res.status(400).json({ error: error.message });
//     }
// };

// module.exports = {
//     getAllevents,
//     createEvent,
//     getevent,
//     deleteevent,
//     updateevent
// };
