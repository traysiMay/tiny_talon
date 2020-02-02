import { combineReducers } from "redux";
import device from "./device";
import map from "./map";
import socket from "./socket";

export default combineReducers({ device, map, socket });
