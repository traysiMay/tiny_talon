import { MAP_INIT } from "../actions";

const ppark = {
  lat: 40.66257,
  lng: -73.968564
};

const mapState = {
  places: { ppark },
  markers: [
    {
      name: "frogass",
      found: false
    },
    {
      name: "meepo",
      found: false
    }
  ]
};

const map = (state = mapState, action) => {
  switch (action.type) {
    case MAP_INIT:
      return { ...state };
    case "FOUND":
      const { name } = action;
      const markers = state.markers.map(m => {
        if (m.name === name) return { ...m, found: true };
        return m;
      });
      return { ...state, markers };
    default:
      console.log(state);
      return state;
  }
};

export default map;
