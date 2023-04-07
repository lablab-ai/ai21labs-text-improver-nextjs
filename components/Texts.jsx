import { useState, useCallback } from "react";
import Modal from "./Modal";

const Texts = ({ text, changeTheTextInTextArray, index: textIndex }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = useCallback(() => {
    if (text.suggestions?.length > 0) {
      setShowModal(true);
    }
  }, [text.suggestions]);

  return (
    <>
      <span
        style={{
          color: `${text.suggestions?.length > 0 ? "red" : ""}`,
          cursor: `${text.suggestions?.length > 0 ? "pointer" : ""}`,
        }}
        onClick={handleClick}
      >
        {text.acceptedText || text.originalText}
      </span>
      {text.suggestions?.length > 0 && showModal && (
        <Modal
          setShowModal={setShowModal}
          text={text}
          changeTheTextInTextArray={changeTheTextInTextArray}
          textIndex={textIndex}
        />
      )}
    </>
  );
};

export default Texts;
