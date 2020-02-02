import { MAP_INIT } from "../actions";

const ppark = {
  lat: 40.66257,
  lng: -73.968564
};

const mapState = {
  places: { ppark }
};

const map = (state = mapState, action) => {
  switch (action.type) {
    case MAP_INIT:
      return { ...state };
    default:
      return state;
  }
};

export default map;
