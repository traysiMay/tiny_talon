import { MAP_INIT, MAP_KEY } from "../actions";

const ppark = {
  lat: 40.66257,
  lng: -73.968564
};

const mapState = {
  places: { ppark },
  mapKey: "",
  markers: []
};

const map = (state = mapState, action) => {
  switch (action.type) {
    case MAP_INIT:
      const { markers } = action;
      return { ...state, markers };
    case MAP_KEY:
      const { mapKey } = action;
      return { ...state, mapKey };
    default:
      return state;
  }
};

export default map;
