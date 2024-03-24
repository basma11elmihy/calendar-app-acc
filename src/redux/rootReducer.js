import { combineReducers } from "redux";
// redux-persist
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import EventsSlice from "./slices/EventsSlice";
import ModalSlice from "./slices/ModalSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const eventsPersistConfig = {
  key: "events",
  storage,
  keyPrefix: "redux-",
  whitelist: [
    "events",
  ],
}
const rootReducer = combineReducers({
  events: persistReducer(eventsPersistConfig, EventsSlice),
  modal: ModalSlice
});

export { rootPersistConfig, rootReducer };
