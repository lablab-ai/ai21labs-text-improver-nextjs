import { useState, useEffect, useCallback } from "react";
import Texts from "./Texts";

/**
 * This component is responsible for taking the input text and showing the improvements
 * @returns  {JSX.Element}
 */
const defaultText= "Affiliated with the profession of project management, I have ameliorated myself with a different set of hard skills as well as soft skills";
const TextImprovementInput = () => {
  const [text, setText] = useState(defaultText);
  const [improvements, setImprovements] = useState([]);
  const [textArray, setTextArray] = useState([]);

  const changeTheTextInTextArray = useCallback(
    ({ index, suggestion }) => {
      let newTextArray = [...textArray];
      newTextArray[index].acceptedText = suggestion;
      setTextArray(newTextArray);
    },
    [textArray]
  );

  const handleButtonClick = async () => {
    try {
      const response = await fetch("api/improve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setImprovements(data?.improvements);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (improvements.length > 0) {
      let textArray = [];
      let endIndex = 0;
      improvements.forEach((improvement, index) => {
        index &&
          textArray.push({
            originalText: text.slice(endIndex, improvement.startIndex),
            suggestions: [],
            improvementType: "",
          });
        textArray.push({
          originalText: text.slice(
            improvement.startIndex,
            improvement.endIndex
          ),
          suggestions: improvement.suggestions,
          acceptedText: "",
          improvementType: improvement.improvementType,
        });
        index === improvements.length - 1 &&
          textArray.push({ originalText: text.slice(improvement.endIndex) });
        endIndex = improvement.endIndex;
      });
      setTextArray(textArray);
      return;
    }
    setTextArray([]);
  }, [improvements]);

  return (
    <>
      <div className="text-improvement-input">
        <textarea
          id="textbox"
          rows="4"
          cols="40"
          name="textbox"
          defaultValue={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button onClick={handleButtonClick}>Improve</button>
      </div>
      {textArray.length > 0 && (
        <div>
          <h3>The red text can be improved click on it</h3>
          <div>
            {textArray.map((text, index) => (
              <Texts
                text={text}
                key={index}
                changeTheTextInTextArray={changeTheTextInTextArray}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
      <style jsx>{`
        .text-improvement-input {
          display: flex;
          flex-direction: column;
          width: 70%;
          margin: 0 auto;
          height: 350px;
        }
        #textbox {
          margin-bottom: 10px;
          width: 100%;
          min-width: 100%;
          max-width: 100%;
          height: 70%;
          resize: none;
        }
        button {
          width: 100px;
          height: 30px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default TextImprovementInput;
