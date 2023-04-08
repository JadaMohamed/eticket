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
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/navbar";
import SubNavbar from "../../components/common/subnavbar";

export const Createevent = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { profile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ispublished, setIspublished] = useState(false);
  const [msgeError, setmsgeError] = useState(false);
  const [hostedImages, setHostedImages] = useState([]);
  const [createEventStep, setCreateEventStep] = useState(1);

  const [eventData, setEventData] = useState({
    eventTitle: "",
    date: "",
    time: "00:00",
    address1: "",
    address2: "",
    trailer_video_url: "",
    categories: [{ name: "", price: "", numSeats: "" }],
    description: "",
    eventType: "",
    Event_Images: [],
  });

  const [imageCollector, setImages] = useState({ images: ["", "", ""] });
  const [previewSources, setPreviewSources] = useState(imageCollector.images);

  const uploadfiles = () => {
    const promises = [];
    for (let i = 0; i < previewSources.length; i++) {
      if (previewSources[i] === "") continue;
      promises.push(uploadImage(previewSources[i]));
    }
    return Promise.all(promises);
  };

  const handleUpload = () => {
    return new Promise((resolve, reject) => {
      //emptying the table of image befor useing it
      eventData.Event_Images.splice(0, eventData.Event_Images.length);
      //after upload files puting result urls in the table
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
        })
        .catch((error) => {
          reject(error);
          console.error(error);
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
    // console.log("startTime");
    // console.log(startTime);
    const { date, time, ...eventDataWithoutDateTime } = eventData;
    const eventDataWithStartTime = {
      ...eventDataWithoutDateTime,
      startTime,
    };
    return eventDataWithStartTime;
  };

  const handlePublish = async (event) => {
    setmsgeError("");
    console.log("previewSources");
    console.log(previewSources);
    //if all element in the array are empty means user did not choise eny image
    if (!previewSources.some((elem) => elem !== "")) {
      setmsgeError("you cannot publish event without images");
      return;
    }
    if (ispublished === true) {
      setmsgeError("Already publishing your event ...");
      return;
    }
    event.preventDefault();
    setIspublished(true);
    try {
      await handleUpload(); // Wait for images to be uploaded before continuing
      if (isLastStep) {
        const preparedEventData = prepareEventDataForSubmit();
        const response = await Axios.post(
          `${apiUrl}/api/events/create/${profile.user.org_id}`,
          preparedEventData,
          { withCredentials: true }
        );
        if (response.status === 200) {
          navigate("/organizer/events");
        }
      }
    } catch (error) {
      if (error.response.data.error) {
        setIspublished(false);
        setmsgeError(error.response.data.error);
      } else {
        console.error(error);
      }
    }
    navigate("/organizer/dashboard");
  };

  function handelGoBack() {
    setmsgeError("");
    setCreateEventStep(createEventStep - 1);
    back();
  }

  const validateFirstStep = () => {
    if (!eventData.first_name) {
      setmsgeError("Please enter your first name*");
      return false;
    }

    if (!eventData.last_name) {
      setmsgeError("Please enter your last name*");
      return false;
    }

    if (!eventData.email) {
      setmsgeError("Please enter your email*");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(eventData.email)) {
      setmsgeError("Please enter a valid email*");
      return false;
    }

    if (!eventData.city) {
      setmsgeError("Please enter your city*");
      return false;
    }

    return true;
  };

  useEffect(() => {
    console.log("createEventStep", createEventStep);
  }, [createEventStep]);

  ///////////////////////////////
  function validateCreateEventStep1() {
    if (!eventData.eventTitle) {
      setmsgeError("Please enter a title for the Event");
      return false;
    } else if (eventData.eventTitle.trim().length < 5) {
      setmsgeError("Event title should be at least 5 caracters");
      return false;
    }

    const currentDate = new Date();
    const maxDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

    if (!eventData.date) {
      setmsgeError("Please choose a date for the Event");
      return false;
    } else {
      const selectedDate = new Date(eventData.date);
      if (selectedDate < maxDate) {
        setmsgeError(
          "This date is not accepted. Please choose a date after 24 hours from now."
        );
        return false;
      }
    }

    // Rest of the code when the date is valid

    if (!eventData.time) {
      setmsgeError("Please choose a time for the Event");
      return false;
    }
    if (!eventData.address1.trim()) {
      setmsgeError("Please enter city name for the Event");
      return false;
    }
    if (!eventData.address2.trim()) {
      setmsgeError("Please add Adress for the Event");
      return false;
    }
    return true;
  }

  function validateCreateEventStep2() {
    if (eventData.categories.length < 1) {
      setmsgeError("Please Add Ticket categorie for the Event");
      return false;
    } else {
      const isValid = eventData.categories.every((category) => {
        return (
          category.name.trim() !== "" &&
          category.price !== "" &&
          category.price >= 0 &&
          category.numSeats !== "" &&
          category.numSeats
        );
      });
      if (!isValid) {
        setmsgeError("Please complete your Ticket categorie info the Event");
        return false;
      }
    }

    return true;
  }
  function validateCreateEventStep3() {
    if (!eventData.description.trim()) {
      setmsgeError("Please enter a description for the Event");
      return false;
    } else if (eventData.description.trim().length < 10) {
      setmsgeError("Invalide Event description 10 characters at least.");
      return false;
    }

    if (!eventData.eventType.trim()) {
      setmsgeError("Please select or Enter a categorie for the Event");
      return false;
    }
    return true;
  }

  function validateCreateEventStep5() {
    if (!previewSources.some((elem) => elem !== "")) {
      setmsgeError("Please choose images for the Event.");
      return false;
    }
    return true;
  }

  function handlenext() {
    setmsgeError("");
    if (createEventStep === 1 && !validateCreateEventStep1()) {
      return;
    }
    if (createEventStep === 2 && !validateCreateEventStep2()) {
      return;
    }
    if (createEventStep === 3 && !validateCreateEventStep3()) {
      return;
    }
    if (createEventStep === 5 && !validateCreateEventStep5()) {
      return;
    }

    setCreateEventStep(createEventStep + 1);
    setmsgeError("");
    next();
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiplePageForm([
      <Overview_form eventData={eventData} setEventData={setEventData} />,
      <Pricing_form eventData={eventData} setEventData={setEventData} />,
      <Description_form
        eventData={eventData}
        setEventData={setEventData}
        setmsgeError={setmsgeError}
      />,
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
      <Navbar />
      <SideBar activeBtn="events" />
      <div className="create-event-container">
        <Createeventflow activestep={`${currentStepIndex + 1}`} />
        <form action="">
          <div className="form-container">
            <div className="top-form-container">{step}</div>
            {msgeError && (
              <div>
                <span style={{ color: "red" }}>{msgeError}</span>
              </div>
            )}
            <div className="bottom-form-container">
              {!isFirstStep && (
                <button className="back" type="button" onClick={handelGoBack}>
                  Back
                </button>
              )}
              {!isLastStep && (
                <button className="next" type="button" onClick={handlenext}>
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
