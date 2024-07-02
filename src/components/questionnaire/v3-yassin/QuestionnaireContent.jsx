import {useRef, useState} from "react";
import {idaData as data} from "../../../assets/data/ida-data.js";
import dataUserScore from "../../services/dataUserScore.js";
import statusCalculator from "../../services/statusCalculator.js";
import Prudent from "../../../assets/imgs/vectors/Prudent.svg";
import Modere from "../../../assets/imgs/vectors/Moderate.svg";
import Dynamic from "../../../assets/imgs/vectors/Dynamic.svg";
import Agressif from "../../../assets/imgs/vectors/Aggressive.svg";

/**
 * @function QuestionnaireContent
 * @description This is a functional component that renders the questionnaire content.
 * @returns {JSX.Element} The rendered component.
 */
const QuestionnaireContent = () => {
  // State variables
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState({ Prudent: 0, modere: 0, Agressif: 0 });
  const [result, setResult] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const scoreLevel = dataUserScore(score.Prudent, score.modere, score.Agressif);
  const personType = statusCalculator(scoreLevel);
  const options = useRef([]);

  /**
   * @function checkAns
   * @description This function is called when a user selects an answer. It updates the score based on the selected answer.
   * @param {Event} e - The event object.
   * @param {string} ans - The selected answer.
   */
  const checkAns = (e, ans) => {
    const chosenPoints = question.points[ans];
    setScore((prev) => ({
      Prudent: prev.Prudent + chosenPoints.Prudent,
      modere: prev.modere + chosenPoints.modere,
      Agressif: prev.Agressif + chosenPoints.Agressif,
    }));
    setSelectedChoice(ans);
    setLock(true);
  };

  /**
   * @function next
   * @description This function is called when the user clicks the "Next" button. It moves to the next question if the current question is answered.
   */
  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setSelectedChoice(null);
      setLock(false);
    }
  };

  /**
   * @function previous
   * @description This function is called when the user clicks the "Previous" button. It moves to the previous question.
   */
  const previous = () => {
    if (index > 0) {
      setIndex(--index);
      setQuestion(data[index]);
      setSelectedChoice(null);
      setLock(false);
    }
  };

  /**
   * @function reset
   * @description This function is called when the user clicks the "Repeat" button. It resets the questionnaire.
   */
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore({ Prudent: 0, modere: 0, Agressif: 0 });
    setLock(false);
    setResult(false);
  };

  /**
   * @function getColorClass
   * @description This function returns the color class based on the person type.
   * @param {string} personType - The type of the person.
   * @returns {string} The color class.
   */

  const colorTextTypePerson = {
    Prudent: "text-green-700",
    Modere: "text-cyan-600",
    Dynamic: "text-cyan-700",
    Agressif: "text-red-700",
  };

  // Mapping of person types to their corresponding images
  const personTypeImages = {
    Prudent: Prudent,
    Modere: Modere,
    Dynamic: Dynamic,
    Agressif: Agressif,
  };

  return (
    <div className="container mx-auto text-black flex flex-col space-y-4 p-2 mt-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 font-poppins text-sm">
      {result ? (
        <></>
      ) : (
        <>
          <h1 className="text-2xl sm:text-3xl text-cyan-600">
            {question.group}
          </h1>
          <hr className="h-0.5 bg-gray-300 border-none" />
          <div>
            <h2 className="text-xl sm:text-xl font-semibold mb-2">
              {index + 1}. {question.question}
            </h2>
            {question.field && (
              <li className="text-gray-400 font-semibold">{question.field}</li>
            )}
          </div>

          <ul
            className={`overflow-auto ${
              Object.keys(question.choices).length === 2
                ? "grid grid-cols-1 gap-4"
                : "grid grid-cols-1 sm:grid-cols-2 gap-4"
            }`}
          >
            {Object.keys(question.choices).map((key, idx) => (
              <li
                key={key}
                ref={(ref) => (options.current[key - 1] = ref)}
                onClick={(e) => checkAns(e, key)}
                className={`flex items-center justify-center text-center h-12 sm:h-16 pl-4 sm:pl-6 border border-gray-600 rounded-lg lg:text-base text-sm cursor-pointer hover:bg-gray-200 transition-colors duration-500 ${selectedChoice === key ? "bg-gray-300" : ""} ${
                  Object.keys(question.choices).length % 2 !== 0 &&
                  idx === Object.keys(question.choices).length - 1
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                {question.choices[key]}
              </li>
            ))}
          </ul>

          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={previous}
              aria-label="Previous Question"
              className="w-full sm:w-1/3  h-12 sm:text-lg  text-sm rounded-lg text-gray-900 bg-white border border-gray-300 hover:bg-gray-100"
            >
              Previous
            </button>
            <button
              onClick={next}
              aria-label="Next Question"
              className="w-full sm:w-1/3  h-12 bg-cyan-600  text-white rounded-lg hover:bg-cyan-800 sm:text-lg  text-sm cursor-pointer transition-colors duration-200"
            >
              Next
            </button>
          </div>
          <div className="mx-auto text-base sm:text-lg font-medium">
            <span className="text-cyan-600">{index + 1}</span> of {data.length}{" "}
            questions
          </div>
        </>
      )}
      {result ? (
        <div className="m-2 bg-gray-50 rounded-lg">
          <div className="mx-auto py-16 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-center">
              <div className="flex justify-center">
                <img
                  className="mb-4"
                  src={personTypeImages[personType]}
                  alt="User"
                />
              </div>

              {/* Score details */}
              <div className="lg:pl-8 col-span-2">
                <div>
                  <p className="text-xl font-medium tracking-tight text-gray-900">
                    Hikma Invest:
                    <br />
                    <i className="text-gray-700">
                      rêves, notre expertise. Investissons ensemble pour un
                      avenir réussi.
                    </i>
                  </p>
                </div>

                <div className="mt-6  text-xl grid grid-cols-2 font-medium">
                  <p className="text-gray-800">
                    le score: &nbsp;
                    <i
                      className={`${colorTextTypePerson[personType]} underline underline-offset-2`}
                    >
                      {scoreLevel}
                    </i>
                  </p>
                  <p className="text-gray-800">
                    le Type: &nbsp;
                    <span
                      className={`${colorTextTypePerson[personType]} underline underline-offset-2`}
                    >
                      {personType}
                    </span>
                  </p>
                </div>

                <div className="mt-10 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={reset}
                    className="flex w-1/2 items-center justify-center rounded-md border border-transparent bg-cyan-600 py-3 px-8 text-base font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-2"
                  >
                    Répéter
                  </button>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Investir
                  </h3>
                  <p className="mt-4 text-sm text-gray-500">
                    Hikma Invest, seule plateforme au Maroc qui crée des
                    placements sur-mesure pour chacun de vos projets de vie.{" "}
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:text-cyan-600"
                    >
                      cliquez ici pour investir
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuestionnaireContent;
