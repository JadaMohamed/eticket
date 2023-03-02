import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";
import EventPreview from "../../components/event/event_preview";
import MoreBy from "../../components/event/moreby";

function Events() {
  return (
    <>
      <Navbar />
      <SubNavbar />
      <EventPreview />
      <MoreBy />
    </>
  );
}

export default Events;
