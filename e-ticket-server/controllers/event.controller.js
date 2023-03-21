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

    getAllOrganizerEvents: async (req, res) => {
        const { orgId } = req.params;
        try {
            const events = await eventService.getAllOrganizerEvents(orgId);
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Something went wrong to get all event of organizer" });
        }
    },

    getOrganizerProfileById: async (req, res) => {
        const { orgid } = req.params;
        console.log("orgid   " + parseInt(orgid));
        try {
            const organizer = await eventService.getOrganizerProfileById(orgid);
            res.status(200).json(organizer);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    searchEvents: async (req, res) => {
        try {
            const { allfilters } = req.body;
            const keyword = req.query.keyword;
            const events = await eventService.searchEvents(keyword, allfilters);
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
            trailer_video_url: req.body.trailer_video_url, //not
            description: req.body.description,
            brand_url: req.body.brand_url,
            location: req.body.address1 + "," + req.body.address2,
            start_time: req.body.startTime,
            //calculate the totalSeats from the table categories
            max_number_attendants: req.body.categories.reduce(
                (acc, category) => acc + parseInt(category.numSeats),
                0
            ),
            is_start_selling: req.body.is_start_selling, //not
            event_type: req.body.eventType,
            is_review_enabled: req.body.is_review_enabled, //not
            is_approved: req.body.is_approved, //not
            title: req.body.eventTitle,
        };

        const eventDataWithoutNullProperties = Object.entries(eventData).reduce(
            (acc, [key, value]) => {
                if (value !== null) {
                    acc[key] = value;
                }
                return acc;
            },
            {}
        );


        //get images url from the body of request
        const eventImages = req.body.Event_Images.map((image) => {
            return {
                img_url: image.img_url,
            };
        });
        //this is where the urls will be stored befor creating event and Seatcategore
        const Event_ImagesUrls = eventImages.filter((image) => image?.img_url !== undefined);

        //before create Event check if valide images are exist or quite creation
        if (Event_ImagesUrls.length > 0) {
            console.log('*** checking Event images exist... is ok nice');
            //check number of imges is less than 4
            if (Event_ImagesUrls.length > 4) {
                console.log('Event_ImagesUrls')
                console.log(Event_ImagesUrls)
                console.log('****** there are more than 4 imges so create event blocked ..')
                res.status(400).json({ error: 'there are more than 4 imges so create event blocked' });
                return;
            }
        } else {
            //eventImages
            console.log('eventImages')
            console.log(eventImages)
            console.log('No event images urls defined,Sorray cannot create event !!');
            res.status(400).json({ error: 'No event images defined,Sorray cannot create event !!' });
            return;
        }

        //create the event to database
        try {
            const newEvent = await eventService.createEvent(
                eventDataWithoutNullProperties
            );
            if (newEvent) {
                console.log("\n************Yes event created sucssussfly*********");
            } else {
                console.log('event is not creade mybe there is a problem')
            }
            //get SeatCategorys from requist
            const SeatCategorys = req.body.categories.map((category) => {
                return {
                    event_id: newEvent.event_id,
                    type_name: category.name,
                    type_price: parseInt(category.price),
                    type_description: "description seat category",
                    number_max: parseInt(category.numSeats),
                    number_avialable: parseInt(category.numSeats),
                };
            });
            //create categorys
            const newSeatCategorys = await Promise.all(
                SeatCategorys.map((SeatCategory) =>
                    seatCategoryService.createSeatCategory(SeatCategory)
                )
            );
            //Confirme create Seat categorys
            if (newSeatCategorys) {
                console.log('Seat categorys is created sucssusfally')
            } else {
                console.log('seat categorys is not created maybe some proble there')
            }

            //get images from Event_ImagesUrls
            const Event_Images = Event_ImagesUrls.map((image) => {
                return {
                    event_id: newEvent.event_id,
                    img_url: image.img_url,
                };
            });

            //
            const newEventImages = await Promise.all(
                Event_Images.map((EventImage) =>
                    eventImagesService.createEventImage(EventImage)
                )
            );
            //
            console.log("*******newEventImages");
            console.log(newEventImages);
            console.log("End Operation Yes ********** Every think is nice");
            res.status(200).json({ msg: "event created successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to create event" });
        }
    },

    getAllEventsCategories: async (req, res) => {
        try {
            const categories = await eventService.getAllEventsCategories();
            res.status(200).json({ categories });
        } catch (err) {
            console.error(err);
            res
                .status(500)
                .json({ error: "Internal server error to get all categories " });
        }
    },
    getTopSalesEvents: async (req, res) => {
        try {
            // console.log("Searching......top sales............");
            const events = await eventService.getTopSalesEvents();
            //  console.log(events);
            res.status(200).json(events);
        } catch (err) {
            console.error(err);
            res
                .status(500)
                .json({ error: "Internal server error get events for slider" });
        }
    },
    getEventSales: async (req, res) => {
        try {
            const { orgId } = req.params;
            const { eventId, timeframe } = req.query;
            let sales;
            if(eventId) {
                sales = await eventService.getEventSales(parseInt(orgId), timeframe, parseInt(eventId))
            } else {
                sales = await eventService.getEventSales(parseInt(orgId), timeframe)
            }
            res.status(200).json(sales);
        } catch(err) {
            console.error(err);
            res
            .status(500)
            .json({ error: "Internal server error get events sales" });
        }
    }
};

export default eventController;
