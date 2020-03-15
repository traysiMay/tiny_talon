import {
  MAP_INIT,
  MARKER_FOUND,
  NEW_MARKER,
  HUNT_COMPLETED,
  RESET
} from "../actions";

const ppark = {
  lat: 40.66257,
  lng: -73.968564
};

const mapState = {
  places: { ppark },
  markers: [],
  markersFound: [],
  name: "",
  completed: false
};

const map = (state = mapState, action) => {
  switch (action.type) {
    case MAP_INIT:
      const {
        markers: { completed, markers, markerMap, name }
      } = action;
      return { ...state, completed, markers, markersFound: markerMap, name };
    case MARKER_FOUND:
      const { markersFound } = action;
      return { ...state, markersFound };
    case NEW_MARKER:
      const { newMarker } = action;
      return { ...state, markers: [...state.markers, newMarker] };
    case HUNT_COMPLETED:
      return { ...state, completed: true };
    case RESET:
      return mapState;
    default:
      return state;
  }
};

export default map;
