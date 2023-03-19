import React, { useContext, useEffect, useState } from "react";
import Createeventflow from "../components/createeventflow";
import OrNavigationBar from "../components/navigation_bar";
import SideBar from "../components/side_bar";
import useMultiplePageForm from "../components/useMultiplePageForm.ts";
import "../css/createevent.css";
import Overview_form from "../components/create post form/overview_form";
import Description_form from "../components/create post form/description_form";
import Tickets_form from "../components/create post form/tickets_form";
import Pricing_form from "../components/create post form/pricing_form";
import Gallery_form from "../components/create post form/gallery_form";
import Axios from "axios";
import AuthContext from "../../Auth/AuthContext";
import ValidateEventInfos from "../components/create post form/validate_event_infos";

export const Createevent = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { profile } = useContext(AuthContext);
  const [hostedImages, setHostedImages] = useState([]);
  const [eventData, setEventData] = useState({
    // Overview_form coming data
    eventTitle: "my nice event title",
    date: "03-20-2023",
    time: "20:00",
    finish_time: "2023-03-21T20:00:00.000Z",
    duration: "10h",
    address1: "my address 1",
    address2: "my second adress",
    trailer_video_url: "youtube.trailer_video_url.com",
    // Pricing_form coming data
    categories: [
      { name: "vip", price: 50, numSeats: 33 },
      { name: "basic", price: 20, numSeats: 100 },
    ],
    // Description_form coming data
    description: "this is my event discription",
    eventCategory: "Festivale | Concert",
    //Gallery_form
    Event_Images: [],
  });
  // const handleSubmitFile = (e) => {
  //   // e.preventDefault();
  //   if (!eventData.images) return;
  //   return uploadImage(eventData.images);
  // };

  const [imageCollector, setImages] = useState({ images: ["", "", ""] });
  const [previewSources, setPreviewSources] = useState(imageCollector.images);

  const uploadfiles = () => {
    const promises = [];
    if (!previewSources) {
      return Promise.resolve([]);
    } else {
      for (let i = 0; i < previewSources.length; i++) {
        if (previewSources[i] === "") break;
        promises.push(uploadImage(previewSources[i]));
      }
      return Promise.all(promises);
    }
  };
  const handleUpload = () => {
    return new Promise((resolve, reject) => {
      uploadfiles()
        .then((result) => {
          eventData.Event_Images.push({ img_url: result[0] });
          if (result[1]) {
            eventData.Event_Images.push({ img_url: result[1] });
          }
          if (result[2]) {
            eventData.Event_Images.push({ img_url: result[2] });
          }
          resolve();
          return result;
        })
        .catch((error) => {
          reject(error);
          console.error(error); // handle any errors that occur while handling the Promise objects
        });
    });
  };
  useEffect(() => {
    console.log(eventData);
  }, [eventData]);
  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      const response = await fetch(`${apiUrl}/api/images/eventimages/upload/`, {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  // Convert date and time to ISO format
  const convertToIsoDateTime = () => {
    const [month, day, year] = eventData.date.split("-");
    const [hours, minutes] = eventData.time.split(":");
    const dateTime = new Date(year, month - 1, day, hours, minutes);
    console.log(dateTime);
    return dateTime.toISOString();
  };

  // Remove date and time properties from eventData and add isoDateTimeString instead
  const prepareEventDataForSubmit = () => {
    const startTime = convertToIsoDateTime();
    console.log("startTime");
    console.log(startTime);
    const { date, time, ...eventDataWithoutDateTime } = eventData;
    const eventDataWithStartTime = {
      ...eventDataWithoutDateTime,
      startTime,
    };
    return eventDataWithStartTime;
  };

  const handlePublish = async (event) => {
    event.preventDefault();
    try {
      await handleUpload(); // Wait for images to be uploaded before continuing
      console.log("creating event");
      if (isLastStep) {
        const preparedEventData = prepareEventDataForSubmit();
        const response = await Axios.post(
          `${apiUrl}/api/events/create/${profile.user.org_id}`,
          preparedEventData,
          { withCredentials: true }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiplePageForm([
      <Overview_form eventData={eventData} setEventData={setEventData} />,
      <Pricing_form eventData={eventData} setEventData={setEventData} />,
      <Description_form eventData={eventData} setEventData={setEventData} />,
      <Tickets_form eventData={eventData} setEventData={setEventData} />,
      <Gallery_form
        imageCollector={imageCollector}
        setImages={setImages}
        previewSources={previewSources}
        setPreviewSources={setPreviewSources}
      />,
      <ValidateEventInfos
        previewSources={previewSources}
        eventData={eventData}
      />,
    ]);

  // const {steps, currentStepIndex, step , isFirstStep, isLastStep}

  return (
    <div>
      <OrNavigationBar />
      <SideBar activeBtn="events" />
      <div className="create-event-container">
        <Createeventflow activestep={`${currentStepIndex + 1}`} />
        <form action="">
          <div className="form-container">
            <div className="top-form-container">{step}</div>
            <div className="bottom-form-container">
              {!isFirstStep && (
                <button className="back" type="button" onClick={back}>
                  Back
                </button>
              )}
              {!isLastStep && (
                <button className="next" type="button" onClick={next}>
                  {" "}
                  Continue{" "}
                </button>
              )}
              {isLastStep && (
                <button className="next" type="button" onClick={handlePublish}>
                  {" "}
                  Publish{" "}
                </button>
              )}
              {/* <button className="next" type="button" onClick={next}>
                {isLastStep ? "Publish " : "Continue"}
              </button> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
