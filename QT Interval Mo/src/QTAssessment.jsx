import { useState, useEffect } from "react";
import "./QTAssessment.css";
import rightArrow from "./assets/rightarrow.svg";
import leftArrow from "./assets/leftarrow.svg";

function QTAssessment() {
  const steps = [
    {
      title: "Start: Obtain baseline 12-lead ECG",
      subPoints: [],
      nextStep: 1,
    },
    {
      title: "Step 1: Use Fredericia's formula (QTcF) for correction.",
      subPoints: [],
      nextStep: 2,
    },
    {
      title: "Step 2: QTcF Value",
      subPoints: [
        {
          text: "QTcF Value:",
          options: [
            "QTcF <470 msec in males or <480 msec in females: Proceed with cancer therapy then Step 8",
            "QTcF is longer than normal (or longer than desired for clinical trials): Proceed to Step 3",
          ],
        },
      ],
    },
    {
      title: "Step 3: Assess QRS duration",
      subPoints: [
        {
          text: "Assess QRS duration:",
          options: [
            "<120 msec: Proceed to Step 6",
            ">120 msec: Proceed to Step 4",
          ],
        },
      ],
    },
    {
      title: "Step 4: Use the Mayo Clinic Modified QT calculator",
      subPoints: [
        {
          options: [
            <span>
              <a
                href="https://www.mayoclinic.org/medical-professionals/cardiovascular-diseases/calculators/corrected-qt-interval-qtc-calculator/itt-20487211"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mayo Clinic Modified QT Calculator.
              </a>
            </span>,
          ],
        },
      ],
      nextStep: 5,
    },
    {
      title: "Step 5: Reassess QTcF",
      subPoints: [
        {
          text: "Reassess QTcF:",
          options: [
            "QTcF <470 msec in males or <480 msec in females: Proceed with cancer therapy then Step 8",
            "QTcF is longer than normal (or longer than desired for clinical trials): Proceed to Step 6",
          ],
        },
      ],
    },
    {
      title: "Step 6: Evaluate for reversible causes",
      subPoints: [
        "Potassium <4; Magnesium <2 (replete and repeat EKG after 24 hours)",
        "QT-prolong medication (stop or reduce dose as feasible)",
      ],
      nextStep: null,
    },
    {
      title: "Step 7: QTcF remains elevated",
      subPoints: ["Contact Cardio-oncology using SmartWeb for review."],
      nextStep: null,
    },
    {
      title: "Step 8: Monitor QTcF periodically per clinical recommendations",
      subPoints: ["Monitor QTcF periodically per clinical recommendations."],
      nextStep: null,
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 10);
    return () => clearTimeout(timeout);
  }, [currentStep]);

  useEffect(() => {
    const handlePopState = (event) => {
      const step = event.state ? event.state.step : 0;
      if (step >= 0 && step < steps.length) {
        setCurrentStep(step);
        setAnimate(false);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleOptionClick = (optionText) => {
    console.log("Processing option:", optionText);
    let nextStepIndex;

    const proceedMatch = optionText.match(
      /(?:Proceed to Step (\d+)|then Step (\d+))\s*$/
    );
    if (proceedMatch) {
      const stepNum = proceedMatch[1] || proceedMatch[2];
      console.log("Raw matched step number:", stepNum);
      nextStepIndex = parseInt(stepNum, 10);
      console.log("Calculated nextStepIndex:", nextStepIndex);
    } else {
      nextStepIndex = steps[currentStep].nextStep;
      console.log("Falling back to nextStep:", nextStepIndex);
    }

    if (
      nextStepIndex !== undefined &&
      nextStepIndex >= 0 &&
      nextStepIndex < steps.length &&
      steps[currentStep].nextStep !== null
    ) {
      console.log("Navigating to step:", nextStepIndex);
      setCurrentStep(nextStepIndex);
      setAnimate(false);
    } else {
      console.log("Navigation blocked or invalid:", {
        nextStepIndex,
        currentStep,
        allowsNavigation: steps[currentStep].nextStep !== null,
      });
    }
  };

  const handleNextClick = () => {
    const nextIndex = currentStep + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(nextIndex);
      setAnimate(false);
    }
  };

  const handleBackClick = () => {
    const prevIndex = currentStep - 1;
    if (prevIndex >= 0) {
      setCurrentStep(prevIndex);
      setAnimate(false);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="wrapper">
      <div className="qt-assessment">
        <h2>QTcF Assessment in Cardio-Oncology</h2>
        <div className="assessment-content">
          <div
            className="step-content"
            key={currentStep}
            data-animate={animate}
          >
            <div className="step-column">
              <h3>{currentStepData.title}</h3>
              {currentStepData.subPoints.map((point, pointIndex) => (
                <div key={pointIndex} className="sub-point">
                  {typeof point === "string" ? (
                    <p className="hyphen-point">{point}</p>
                  ) : (
                    <>
                      <p className="hyphen-point">{point.text}</p>
                      {point.options && (
                        <ul className="bullet-list">
                          {point.options.map((option, optIndex) => {
                            if (typeof option !== "string") {
                              return <li key={optIndex}>{option}</li>;
                            }
                            // Split option at the colon for steps 2, 3, 5
                            const [prefix, clickableText] = option.split(": ");
                            const isProceedOption =
                              clickableText &&
                              (clickableText.includes("Proceed to Step") ||
                                clickableText.includes("then Step"));
                            return (
                              <li key={optIndex}>
                                {prefix}:{" "}
                                {isProceedOption ? (
                                  <span
                                    onClick={() =>
                                      handleOptionClick(clickableText)
                                    }
                                    style={{
                                      cursor: "pointer",
                                      color: "#646cff",
                                    }}
                                  >
                                    {clickableText}
                                  </span>
                                ) : (
                                  <span>{clickableText}</span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  )}
                  {pointIndex === currentStepData.subPoints.length - 1 && (
                    <hr className="step-separator" />
                  )}
                </div>
              ))}
            </div>
            <div className="button-container">
              {currentStep > 0 && (
                <button className="back-button" onClick={handleBackClick}>
                  <img src={leftArrow} alt="Back" />
                </button>
              )}
              {currentStep < steps.length - 1 && (
                <button className="next-button" onClick={handleNextClick}>
                  <img src={rightArrow} alt="Next" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QTAssessment;
