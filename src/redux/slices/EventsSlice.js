import { createSlice } from "@reduxjs/toolkit";

const EventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    currentEvent: undefined,
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default EventsSlice.reducer;
export const { setEvents, setCurrentEvent } =
  EventsSlice.actions;
