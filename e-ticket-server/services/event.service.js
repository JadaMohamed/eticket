import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const eventService = {
  getAllEvents: async () => {
    const events = await prisma.event.findMany({
      include: {
        //ClientWaitList: true,
        Event_Images: true,
        //Event_Review: true,
        //Orders_Cart: true,
        //Paid_Tickets_Orders: true,
        SeatCategory: true,
        //Ticket: true,
      },
    });
    return events;
  },

  createEvent: async (eventData) => {
    const newEvent = await prisma.event.create({
      data: eventData,
    });
    return newEvent;
  },

  getEventById: async (eventId) => {
    const event = await prisma.event.findUnique({
      where: { event_id: eventId },
      include: {
        ClientWaitList: true,
        Event_Images: true,
        Event_Review: true,
        Orders_Cart: true,
        Paid_Tickets_Orders: true,
        SeatCategory: true,
        Ticket: true,
      },
    });
    return event;
  },

  deleteEventById: async (id) => {
    return await prisma.event.delete({
      where: { event_id: id },
    });
  },

  updateEvent: async (id, data) => {
    return await prisma.event.update({
      where: { event_id: parseInt(id) },
      data,
    });
  },

  searchEvents: async (keyword, allfilters) => {
    const events = await prisma.event.findMany({
      where: {
        AND: [
          {
            OR: [
              { description: { contains: keyword } },
              { location: { contains: keyword } },
              { title: { contains: keyword } },
            ],
          },
          allfilters.categories.length > 0
            ? { event_type: { in: allfilters.categories } }
            : {},
          allfilters.cities.length > 0
            ? { location: { in: allfilters.cities } }
            : {},
        ],
      },
    });
    return events;
  },

  getLastThreeEventsForOrganizer: async (orgId) => {
    const events = await prisma.event.findMany({
      where: {
        org_id: orgId,
      },
      orderBy: {
        created_at: "desc",
      },
      take: 3,
    });
    return events;
  },

  getOrganizerEventStats: async (orgId) => {
    const events = await prisma.event.findMany({
      where: {
        org_id: orgId,
      },
      select: {
        number_sold_tickets: true,
        max_number_attendants: true,
      },
    });

    const totalSoldTickets = events.reduce(
      (acc, curr) => acc + curr.number_sold_tickets,
      0
    );
    const totalMaxAttendees = events.reduce(
      (acc, curr) => acc + curr.max_number_attendants,
      0
    );

    return {
      totalSoldTickets,
      totalMaxAttendees,
    };
  },
  getAllOrganizerEvents: async (orgId) => {
    const events = await prisma.event.findMany({
      where: {
        org_id: parseInt(orgId),
      },
      include: {
        Event_Images: true,
      },
    });
    return events;
  },
  getOrganizerProfileById: async (orgId) => {
    return prisma.organizer.findUnique({
      where: {
        org_id: parseInt(orgId),
      },
      include: {
        Events: true,
      },
    });
  },
  getTopSalesEvents: async () => {
    const events = await prisma.event.findMany({
      include: {
        Event_Images: true,
        // number_sold_tickets: true,
      },
      orderBy: {
        number_sold_tickets: "desc",
      },
      take: 10,
    });
    return events;
  },

  getAllEventsCategories: async () => {
    const categories = await prisma.event.findMany({
      distinct: ["event_type"],
      select: {
        event_type: true,
      },
    });
    return categories;
  },
};

export default eventService;

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// export const createEvent = async (data) => {
//     const newEvent = await prisma.event.create({
//         data: {
//             org_id: data.org_id,
//             duration: data.duration,
//             trailer_video_url: data.trailer_video_url,
//             description: data.description,
//             brand_url: data.brand_url,
//             location: data.location,
//             start_time: data.start_time,
//             finish_time: data.finish_time,
//             number_sold_tickets: data.number_sold_tickets,
//             number_of_waiters: data.number_of_waiters,
//             max_number_attendants: data.max_number_attendants,
//             is_start_selling: data.is_start_selling,
//             event_type: data.event_type,
//             is_review_enabled: data.is_review_enabled,
//             is_approved: data.is_approved,
//         },
//     });
//     return newEvent;
// };
