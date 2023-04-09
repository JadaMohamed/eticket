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
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    document.title = "Search - E-Ticket";
  }, []);
  let { value } = useParams();
  const [events, setEvents] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [allfilters, setAllfilters] = useState({
    categories: [],
    cities: [],
  });

  const searchEvents = async (keyword) => {
    // console.log("allfilters")
    // console.log(allfilters)
    // console.log('filters')
    // console.log(filters)
    // console.log('keyword')
    // console.log(keyword)
    try {
      const response = await Axios.post(
        `${apiUrl}/api/events/search?keyword=${keyword}`,
        { allfilters: allfilters }
      );
      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("yo yo : ", events);

  const handleCategoryChange = () => {
    const category = value.trim();
    setFilters([category]);
    setAllfilters({ categories: [category], cities: [] });
  };

  useEffect(() => {
    if (value?.startsWith(" ")) {
      // console.log('value')
      // console.log(value)
      handleCategoryChange();
      searchEvents("");
      value = "";
      return;
    }

    searchEvents(value);
    console.log("ssearching for keyword " + value);
  }, [value]);

  useEffect(() => {
    if (value?.startsWith(" ")) {
      searchEvents("");
      return;
    }
    searchEvents(value);
    console.log("ssearching for keyword " + value);
  }, [allfilters]);
  return (
    <>
      <Navbar />
      <SubNavbar />
      <SearchFilter
        searchKeyword={value}
        allfilters={allfilters}
        setAllfilters={setAllfilters}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="margin-top"></div>
      <div className="search-container">
        <div className="cards">
          {events.length > 0 ? (
            events.map((eventData) => (
              <Card
                eventid={eventData.event_id}
                image={eventData.brand_url}
                title={eventData.title}
                price={
                  eventData?.SeatCategory?.reduce((prev, current) => {
                    return prev.type_price < current.type_price
                      ? prev
                      : current;
                  }).type_price
                }
                location={eventData.location}
                category={eventData.event_type}
                date={eventData.start_time}
                orgid={eventData.org_id}
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
