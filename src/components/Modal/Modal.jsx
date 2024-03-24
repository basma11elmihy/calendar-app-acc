import React from "react";
import "./modal.css";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setIsEdit, setIsOpen } from "../../redux/slices/ModalSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import EventForm from "../EventForm/EventForm";
import { setCurrentEvent } from "../../redux/slices/EventsSlice";

export default function Modal() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleClose = (e) => {
    dispatch(setIsOpen(false));
    dispatch(setIsEdit(false));
    dispatch(setCurrentEvent(undefined));
  };

  return (
    <div
      className={isOpen ? `overlay active` : `overlay`}
      onClick={(e) => handleClose(e)}
    >
      <div className="modal" onClick={(e) => handleModalClick(e)}>
        <div className="modal-content">
          <button
            className="btn-close-modal"
            onClick={(e) => handleClose(e)}
          >
            <FontAwesomeIcon icon={faClose} size="1x" />
          </button>

          <p className="label-form">Event Form</p>

          <div className="form-event">
            <EventForm/>
          </div>
        </div>
      </div>
    </div>
  );
}
