import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import eventRoutes from "./routes/event.routes.js";
import eventImagesRoutes from "./routes/event-images.routes.js";
import eventReviewRoutes from "./routes/event-reviews.routes.js";
import notificationsRoutes from "./routes/notifications.routes.js";
import ordersCartRoutes from "./routes/orders-cart.routes.js";
import organizersRoutes from "./routes/organizers.routes.js";
import paidTicketsOrdersRoutes from "./routes/paid-tickets-orders.routes.js";
import seatCategoryRoutes from "./routes/seat-category.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import clientWaitListRoutes from "./routes/client-wait-list.routes.js";
import clientRoutes from "./routes/client.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import accountRoutes from "./routes/account.routes.js";
import cardRoutes from "./routes/card.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import userRoutes from "./routes/user.routes.js";
import scannerRoutes from "./routes/scanner.routes.js";
import {
  verifyAdmin,
  verifyClientOrAdmin,
  verifyJwt,
  verifyOrganizerOrAdmin,
} from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import { handleError } from "./middleware/errorHandlers.js";

const app = express();


// Add middleware to parse request body with a limit of 100 MB
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use(express.json());

// Set up CORS options
const corsOptions = {
  origin: [
    "http://localhost:8000",
    "http://localhost:3000",
    "https://e-ticket-live.onrender.com",
  ], // replace with your frontend app URL
  credentials: true, // allow cookies and other credentials
};

// Enable CORS middleware with options
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/events", eventRoutes);
app.use(
  "/api/event-images",
  verifyJwt,
  verifyOrganizerOrAdmin,
  eventImagesRoutes
);
app.use("/api/event-reviews", verifyJwt, eventReviewRoutes);
app.use("/api/notifications", verifyJwt, notificationsRoutes);
app.use("/api/orders-cart", verifyJwt, ordersCartRoutes);
app.use("/api/organizers", verifyJwt, verifyOrganizerOrAdmin, organizersRoutes);
app.use("/api/paid-tickets-orders", verifyJwt, paidTicketsOrdersRoutes);
app.use("/api/seat-categories", seatCategoryRoutes);
app.use("/api/tickets", verifyJwt, ticketRoutes);
app.use("/api/client-wait-lists", verifyJwt, clientWaitListRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/admins", verifyJwt, verifyAdmin, adminRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/card", cardRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/scanner", scannerRoutes);

app.get("/", (req, res) => {
  res.send("This is e-ticket.com api but go to /api instead :^)");
});

app.use(handleError);

//images api XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
import cloudinary from "./cloudinary/cloudinary.js";

app.post("/api/images/avatar/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "e_ticket",
      folder: "e_ticket/useravatar",
    });
    // console.log(uploadedResponse);
    const url = uploadedResponse.secure_url;
    res.json({ url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "somthing went wrong to uplad avatar image" });
  }
});
app.post("/api/images/eventimages/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "e_ticket",
      folder: "e_ticket/eventsimages",
    });
    // console.log(uploadedResponse);
    const url = uploadedResponse.public_id;
    res.json({ url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "somthing went wrong to upload event images" });
  }
});
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}!`);
});
