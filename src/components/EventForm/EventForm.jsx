import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
//redux
import { useDispatch, useSelector } from "react-redux";
import "./eventForm.css";
import { setCurrentEvent, setEvents } from "../../redux/slices/EventsSlice";
import { savedEvents } from "../Calendar/events";
import { setIsEdit, setIsOpen } from "../../redux/slices/ModalSlice";
import { DateTime } from "luxon";

export default function EventForm() {
  const dispatch = useDispatch();

  const { currentEvent, events } = useSelector((state) => state.events);
  const { isEdit } = useSelector((state) => state.modal);

  const initialValues = {
    title: currentEvent?.title || "",
    start: currentEvent?.start
      ? DateTime.fromJSDate(new Date(currentEvent?.start)).toFormat(
          "yyyy-MM-dd"
        )
      : "",
    end: currentEvent?.end
      ? DateTime.fromJSDate(new Date(currentEvent?.end)).toFormat("yyyy-MM-dd")
      : "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("*Title is required"),
    start: Yup.date().required("*Start date is required"),
    end: Yup.date()
      .required("*End date is required")
      .min(Yup.ref("start"), "*End date must be after start date"),
  });

  const generateUniqueID = () => {
    const timestamp = Date.now();
    const uniqueID =
      timestamp.toString() + Math.random().toString(36).substr(2, 9);

    return uniqueID.toString();
  };

  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleDelete = () => {
    const eventIndex = events.findIndex(
      (event) => event.id === currentEvent.id
    );

    if (eventIndex !== -1) {
      const updatedEvents = [
        ...events.slice(0, eventIndex),
        ...events.slice(eventIndex + 1),
      ];

      dispatch(setEvents(updatedEvents));
    }
    dispatch(setCurrentEvent(undefined));
    dispatch(setIsEdit(false));
    dispatch(setIsOpen(false));
  };
  const handleSubmit = (values) => {
    const { title, start, end } = values;

    if (isEdit) {
      const eventIndex = events.findIndex(
        (event) => event.id === currentEvent.id
      );

      if (eventIndex !== -1) {
        const updatedEvents = [
          ...events.slice(0, eventIndex),
          {
            ...events[eventIndex],
            title,
            start: parseDate(start),
            end: parseDate(end),
            colorEvento: "rgba(35, 35, 46, 0.75)",
            color: "white",
            id: generateUniqueID(),
          },
          ...events.slice(eventIndex + 1),
        ];

        dispatch(setEvents(updatedEvents));
      }
      dispatch(setCurrentEvent(undefined));
      dispatch(setIsEdit(false));
    } else {
      const newEvent = {
        title,
        start: parseDate(start),
        end: parseDate(end),
        colorEvento: "rgba(35, 35, 46, 0.75)",
        color: "white",
        id: generateUniqueID(),
      };
      dispatch(setEvents([...events, newEvent]));
    }

    dispatch(setIsOpen(false));
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form>
            <div className="field">
              <Field
                className="form-field"
                id="title"
                name="title"
                placeholder="Title"
              />
              {errors.title && touched.title && (
                <div className="txt-error">{errors.title}</div>
              )}
            </div>
            <div className="field">
              <Field
                className="form-field"
                id="start"
                name="start"
                type="date"
                placeholder="Start Date"
              />
              {errors.start && touched.start && (
                <div className="txt-error">{errors.start}</div>
              )}
            </div>
            <div className="field">
              <Field
                className="form-field datepickerbg"
                id="end"
                name="end"
                type="date"
                placeholder="End Date"
              />
              {errors.end && touched.end && (
                <div className="txt-error">{errors.end}</div>
              )}
            </div>
            <div className="button-container">
              <button type="submit">Submit</button>
              {isEdit && (
                <button className="btn-del" type="button" onClick={handleDelete}>
                  Delete
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
