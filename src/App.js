import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Example from "./pages/Example/Example";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import MyTickets from "./pages/MyTickets/MyTickets";
import Eror404 from "./components/common/eror404";
import Settings from "./pages/Settings/Settings";
import Search from "./pages/Search/Search";
import Events from "./pages/Events/Events";
import Dashboard from "./organizer/pages/dashboard";
import "./css/index.css";
import OrEvents from "./organizer/pages/events";
import Tickets from "./organizer/pages/tickets";
import Sales from "./organizer/pages/sales";
import Manage_qr from "./organizer/pages/manage_qr";
import { Createevent } from "./organizer/pages/createevent";
import Organizer from "./pages/organizer/organizer";
import { AuthContextProvider } from "./Auth/AuthContext";
import { ProtectClient } from "./Auth/ProtectClient";
import { ProtectOrganizer } from "./Auth/ProtectOrganizer";
import { ProtectAdmin } from "./Auth/ProtectAdmin";
import SignIn from "./pages/SignUp/signin";
import EmailVerify from "./components/EmailVerify";
import PasswordResetForm from "./components/PasswordReset";
import AdminDashboard from "./Interfaces/Admin/Pages/dashboard";
import AdminUserManager from "./Interfaces/Admin/Pages/manageusers";
import AdminSales from "./Interfaces/Admin/Pages/sales";

function App() {
  return (
    <BrowserRouter basename="">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/example/:meow" element={<Example />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/mytickets" element={<MyTickets />} />
          <Route path="/events/:value" element={<Events />} />
          <Route path="/organizer/:orgID" element={<Organizer />} />
          {/* An example of a react route */}
          <Route path="/example" element={<Example />} />

          {/* only for the client and admin */}
          <Route element={<ProtectClient />}>
            {/* <Route path="/events" element={<Events />} /> */}
          </Route>

          <Route
            path="/reset-password/:eticketjwt"
            element={<PasswordResetForm />}
          />
          <Route path="/verify-email/:eticketjwt" element={<EmailVerify />} />
          <Route path="*" element={<Eror404 />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/search/:value/:category" component={Search} />
          <Route path="/search/:value" element={<Search />} />
          <Route path="/search" element={<Search />} />

          {/* only for the Organizer and admin */}
          <Route element={<ProtectOrganizer />}>
            <Route path="/organizer/dashboard" element={<Dashboard />} />
            <Route path="/organizer/events" element={<OrEvents />} />
            {/* <Route path="/organizer/tickets" element={<Tickets />} /> */}
            <Route path="/organizer/sales" element={<Sales />} />
            <Route path="/organizer/manageqr" element={<Manage_qr />} />
            <Route
              path="/organizer/events/createevent"
              element={<Createevent />}
            />
          </Route>
          <Route element={<ProtectAdmin />}>
            {/* I disactivated it to work on interfaces cuz no admin account was verified yet */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manageuser" element={<AdminUserManager />} />
            <Route path="/admin/sales" element={<AdminSales />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
