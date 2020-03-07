import { MAP_INIT, MAP_KEY, MARKER_FOUND } from "../actions";

const ppark = {
  lat: 40.66257,
  lng: -73.968564
};

const mapState = {
  places: { ppark },
  mapKey: "",
  markers: [],
  markersFound: []
};

const map = (state = mapState, action) => {
  switch (action.type) {
    case MAP_INIT:
      const {
        markers: { markers, markerMap }
      } = action;
      return { ...state, markers, markersFound: markerMap };
    case MAP_KEY:
      const { mapKey } = action;
      return { ...state, mapKey };
    case MARKER_FOUND:
      const { markersFound } = action;
      return { ...state, markersFound };
    default:
      return state;
  }
};

export default map;
