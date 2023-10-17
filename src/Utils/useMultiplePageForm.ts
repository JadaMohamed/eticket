import React, { useState } from "react";
import { ReactElement } from "react";

function useMultiplePageForm(steps: ReactElement[]) {
  const [currentStepIndex, SetCurrentStepIndex] = useState(0);
  const step = steps[currentStepIndex];

  function next() {
    SetCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }
  function back() {
    SetCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    back,
  };
}

export default useMultiplePageForm;
