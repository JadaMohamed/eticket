import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const eventService = {
  getAllEvents: async () => {
    const events = await prisma.event.findMany({
      include: {
        SeatCategory: {
          select: {
            type_price: true,
          },
          orderBy: {
            type_price: 'asc'
          },
          take: 1,
        },
      },
      orderBy: {
        event_id: 'desc',
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
        // ClientWaitList: true,
        Event_Images: true,
        // Event_Review: true,
        // Orders_Cart: true,
        // Paid_Tickets_Orders: true,
        SeatCategory: true,
        // Ticket: true,
        Organizer: {
          select: {
            Account: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
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
        Organizer: {
          select: {
            Account: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
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
        Account: {
          select: {
            first_name: true,
            last_name: true,
            avatar: true,
          },
        },
      },
    });
  },

  getTopSalesEvents: async () => {
    const events = await prisma.event.findMany({
      where: {
        start_time: {
          gte: new Date() || new Date(new Date().getTime() + 48 * 60 * 60 * 1000),          // events that haven't started yet
          // lte: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),  // events that started maximum 48 hours ago
          
        },
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
  getEventSales: async (organizerId, timeframe, eventId = null) => {
    let startDate;
    switch (timeframe) {
      case "last7days":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "last30days":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        break;
      case "last24hours":
        startDate = new Date();
        startDate.setHours(startDate.getHours() - 24);
        break;
      default:
        throw new Error(
          "Invalid timeframe : ",
          timeframe,
          "with typeof : ",
          typeof timeframe
        );
    }
    console.log("orgid", organizerId, "start date :", startDate);
    let events;
    if (eventId) {
      events = await prisma.event.findMany({
        // where: { event_id: eventId },
        where: {
          AND: [
            { org_id: organizerId },
            { event_id: eventId },
            { created_at: { gte: startDate } },
          ],
        },
        include: { Ticket: true },
      });
    } else {
      events = await prisma.event.findMany({
        where: {
          AND: [{ org_id: organizerId }, { created_at: { gte: startDate } }],
        },
        include: { Ticket: true },
      });
    }
    console.log(events);
    const ticketsByDay = {};

    events.forEach((event) => {
      event.Ticket.forEach((ticket) => {
        const ticketDate = ticket.created_at.toDateString();
        if (!ticketsByDay[ticketDate]) {
          ticketsByDay[ticketDate] = 0;
        }
        ticketsByDay[ticketDate] += 1;
      });
    });

    return ticketsByDay;
  },
  getTicketsSales: async function (eventId) {
    const event = await prisma.event.findUnique({
      where: { event_id: eventId },
      select: { SeatCategory: true },
    });
    const ticketsBySeatCategory = {};

    for (const seat of event.SeatCategory) {
      const ticketCount = await prisma.ticket.count({
        where: {
          AND: [{ event_id: eventId }, { seat_categ_id: seat.seat_categ_id }],
        },
      });
      ticketsBySeatCategory[seat.type_name] = [ticketCount, seat.number_max];
    }
    return ticketsBySeatCategory;
  },
  getEventSalesPerSeatCategory: async (organizerId, timeframe, eventId = null) => {
    let startDate;
    switch (timeframe) {
      case "last7days":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "last30days":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        break;
      case "last24hours":
        startDate = new Date();
        startDate.setHours(startDate.getHours() - 24);
        break;
      default:
        throw new Error(
          `Invalid timeframe: ${timeframe}, with typeof: ${typeof timeframe}`
        );
    }
    console.log("orgid", organizerId, "start date :", startDate);
    let events;
    if (eventId) {
      events = await prisma.event.findMany({
        where: {
          AND: [
            { org_id: organizerId },
            { event_id: eventId },
            { created_at: { gte: startDate } },
          ],
        },
        include: {
          Ticket: {
            include: { SeatCategory: { select: { seat_categ_id: true, type_name: true } } },
          },
        },
      });
    } else {
      events = await prisma.event.findMany({
        where: {
          AND: [{ org_id: organizerId }, { created_at: { gte: startDate } }],
        },
        include: {
          Ticket: {
            include: { SeatCategory: { select: { seat_categ_id: true, type_name: true } } },
          },
        },
      });
    }
  
    const ticketsBySeatCategory = {};
    events.forEach((event) => {
      event.Ticket.forEach((ticket) => {
        console.log("ticket ? : " , ticket);
        const ticketDate = ticket.created_at.toDateString();
        const category = ticket.SeatCategory.type_name;
        if (!ticketsBySeatCategory[category]) {
          ticketsBySeatCategory[category] = {};
        }
        if (!ticketsBySeatCategory[category][ticketDate]) {
          ticketsBySeatCategory[category][ticketDate] = 0;
        }
        ticketsBySeatCategory[category][ticketDate] += 1;
      });
    });
  
    return ticketsBySeatCategory;
  }
  
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
