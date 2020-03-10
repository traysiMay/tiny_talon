import { MAP_INIT, MAP_KEY, MARKER_FOUND, NEW_MARKER } from "../actions";

const ppark = {
  lat: 40.66257,
  lng: -73.968564
};

const mapState = {
  places: { ppark },
  mapKey: "",
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
    case MAP_KEY:
      const { mapKey } = action;
      return { ...state, mapKey };
    case MARKER_FOUND:
      const { markersFound } = action;
      return { ...state, markersFound };
    case NEW_MARKER:
      const { newMarker } = action;
      return { ...state, markers: [...state.markers, newMarker] };
    case "HUNT_COMPLETED":
      return { ...state, completed: true };
    default:
      return state;
  }
};

export default map;
