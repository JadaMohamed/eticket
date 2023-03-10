import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/common/navbar";
import SearchFilter from "../../components/common/searchfilter";
import SubNavbar from "../../components/common/subnavbar";
import Card from "../../components/event/eventcard";
import { BASE_URL } from "../../Constants";
import "./Search.css";
import loader from "../../img/loading.svg";

function Search() {
  let { value } = useParams("a");
  const [events, setEvents] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const searchEvents = async (keyword) => {
    if (keyword?.length < 1) {
      return;
    }
    try {
      const response = await Axios.get(
        `${apiUrl}/api/events/search?keyword=${keyword}`
      );
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    searchEvents(value);
    console.log("ssearching for keyword " + value);
  }, [value]);
  return (
    <>
      <Navbar />
      <SubNavbar />
      <SearchFilter searchKeyword={`${value}`} />
      <div className="margin-top"></div>
      <div className="search-container">
        <div className="cards">
          {events.length > 0 ? (
            events.map((eventData) => (
              <Card
                key={eventData.event_id}
                image={eventData.image}
                title={eventData.title}
                price={eventData.price}
                location={eventData.location}
                category={eventData.event_type}
                date={eventData.start_time}
              />
            ))
          ) : (
            <div className="loading">
              <img src={loader} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
