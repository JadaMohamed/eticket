import React from "react";
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

export const Createevent = () => {
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiplePageForm([
      <Overview_form />,
      <Pricing_form />,
      <Description_form />,
      <Gallery_form />,
      <Tickets_form />,
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
              <button className="next" type="button" onClick={next}>
                {isLastStep ? "Publish " : "Continue"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
