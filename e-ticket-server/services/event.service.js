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

  searchEvents: async (keyword) => {
    const events = await prisma.event.findMany({
      where: {
        OR: [
          { description: { contains: keyword } },
          { location: { contains: keyword } },
          { event_type: { contains: keyword } },
          { title: { contains: keyword } },
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
        created_at: 'desc',
      },
      take: 3,
    });
    return events;
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
