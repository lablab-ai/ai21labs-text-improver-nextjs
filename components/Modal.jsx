import { useRef, useEffect } from "react";

const Modal = ({ setShowModal, text, changeTheTextInTextArray, textIndex }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, setShowModal]);
  return (
    <>
      <div className="modal">
        <div className="modal-content" ref={modalRef}>
          <span className="close" onClick={() => setShowModal(false)}>
            &times;
          </span>
          <p>Original text: {text.originalText}</p>
          <p>Improvement type: {text.improvementType}</p>
          <ul>
            {text.suggestions.map((suggestion, index) => (
              <li
                style={{ cursor: "pointer"}}
                key={index}
                onClick={() => {
                  changeTheTextInTextArray({ index: textIndex, suggestion });
                  setShowModal(false);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .modal {
          position: fixed; /* Stay in place */
          z-index: 1; /* Sit on top */
          left: 0;
          top: 0;
          width: 100%; /* Full width */
          height: 100%; /* Full height */
          overflow: auto; /* Enable scroll if needed */
          background-color: rgb(0, 0, 0); /* Fallback color */
          background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
        }
        .modal-content {
          background-color: #fefefe;
          margin: 15% auto; /* 15% from the top and centered */
          padding: 20px;
          border: 2px solid #888;
          border-radius: 20px;
          width: 60%; /* Could be more or less, depending on screen size */
        }
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Modal;
