import React, { useEffect, useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import { savedEvents } from "./events";
import { setCurrentEvent, setEvents } from "../../redux/slices/EventsSlice";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { setIsEdit, setIsOpen } from "../../redux/slices/ModalSlice";
import Modal from "../Modal/Modal";

const style = {
  height: "90vh",
  color: "#df49a6",
  padding: "2rem 4rem",
};

export default function ReactCalView() {
  const localizer = luxonLocalizer(DateTime);
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.events);

  const handleSelectEvent = (event) => {
    dispatch(setCurrentEvent(event));
    dispatch(setIsOpen(true));
    dispatch(setIsEdit(true));
  };

  const handleSelectSlot = () => {
    dispatch(setIsOpen(true));
  };

  const handleEventStyles = (events) => {
    const backgroundColor = events.colorEvento ? events.colorEvento : "blue";
    const color = events.color ? events.color : "blue";
    const borderLeft = "solid #df49a6 5px";
    return { style: { backgroundColor, color, borderLeft } };
  };
  
  const parseEvents = () => {
    return events?.map(({ title, start, end, id }) => ({
      title,
      start: new Date(start),
      end: new Date(end),
      colorEvento: "rgba(35, 35, 46, 0.75)",
      color: "white",
      id
    }))
  };


  return (
    <div>
      <Calendar
        localizer={localizer}
        events={parseEvents()}
        startAccessor="start"
        endAccessor="end"
        style={style}
        eventPropGetter={(events) => handleEventStyles(events)}
        onSelectEvent={(event) => handleSelectEvent(event)}
        onSelectSlot={handleSelectSlot}
        selectable
      />
      <Modal />
    </div>
  );
}
