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
  completed: false,
  ready: false,
  loading: true
};

const map = (state = mapState, action) => {
  switch (action.type) {
    case MAP_INIT:
      const {
        markers: { completed, markers, markerMap, name, ready }
      } = action;
      return {
        ...state,
        completed,
        markers,
        markersFound: markerMap,
        name,
        ready,
        loading: false
      };
    case "MAP_READY":
      return { ...state, ready: true };
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
    case "MAP_LOADING":
      return { ...state, loading: true };
    case "MAP_DONE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default map;
