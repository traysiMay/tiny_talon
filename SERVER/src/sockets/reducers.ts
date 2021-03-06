import { getRepository } from "typeorm";
import { Hunts } from "../entity/Hunts";
import { Series, SeriesType } from "../entity/Series";
import { sanitizeInput } from "./utils";
export enum CodeMessage {
  NOT_FOUND = "that ain't right",
  ALREADY_FOUND = "sorry! this one has already been found.",
  NEW_FOUND = "cool find!",
  WIN = "you win!",
}

const huntByMarkerId = async (marker, jwtID) => {
  const {
    code: { input: rawInput, id },
  } = marker;
  const input = sanitizeInput(rawInput);
  const huntsRepo = getRepository(Hunts);
  const hunt = await huntsRepo
    .createQueryBuilder("hunts")
    .leftJoinAndSelect("hunts.series", "series")
    .leftJoinAndSelect("series.markers", "markers")
    .leftJoinAndSelect("hunts.emails", "emails")
    .where("markers.id = :markerId", { markerId: id })
    .andWhere("markers.hash = :markerHash", { markerHash: input })
    .andWhere("emails.id = :eId", { eId: jwtID })
    .getOne();

  return hunt;
};

const huntByMarkerHash = async (rawCode, jwtID) => {
  const code = sanitizeInput(rawCode);
  const huntsRepo = getRepository(Hunts);
  let hunt;
  hunt = await huntsRepo
    .createQueryBuilder("hunts")
    .leftJoinAndSelect("hunts.series", "series")
    .leftJoinAndSelect("series.markers", "markers")
    .leftJoinAndSelect("hunts.emails", "emails")
    .where("markers.hash = :hash", { hash: code })
    .andWhere("emails.id = :eid", { eid: jwtID })
    .getOne();

  if (!hunt) {
    const seriesRepo = getRepository(Series);
    const series = await seriesRepo
      .createQueryBuilder("series")
      .leftJoinAndSelect("series.markers", "markers")
      .where("markers.hash = :code", { code })
      .getOne();

    // if UNIFIED then return the only hunt for the UNIFIED SERIES (akin to the email id of the personal)

    if (series && series.type === SeriesType.GLOBAL) {
      hunt = new Hunts();
      hunt.emails = jwtID;
      hunt.series = series;
      hunt.completed = false;
      await huntsRepo.save(hunt);
    } else if (series && series.type === SeriesType.UNIFIED) {
      hunt = await huntsRepo
        .createQueryBuilder("hunts")
        .leftJoinAndSelect("hunts.series", "series")
        .leftJoinAndSelect("series.markers", "markers")
        .leftJoinAndSelect("hunts.emails", "emails")
        .where("markers.hash = :hash", { hash: code })
        .andWhere("emails.email = :email", { email: "9999" })
        .getOne();
    } else {
      return null;
    }
  }
  return hunt;
};

export const codeReducer = async (code, jwtID) => {
  let hunt;
  const huntsRepo = getRepository(Hunts);

  // This could be bad or not.
  // if the code is sent from the map it has the marker id applied to it
  // and so it is an object
  if (code instanceof Object) {
    hunt = await huntByMarkerId(code, jwtID);
  } else {
    hunt = await huntByMarkerHash(code, jwtID);
  }

  if (!hunt) {
    return {
      completed: false,
      id: 0,
      message: CodeMessage.NOT_FOUND,
      markerMap: [],
    };
  }

  const {
    series: { id, markers, num_markers, type },
    marker_map,
  } = hunt;

  if (marker_map.includes(`${markers[0].id}`)) {
    return { message: CodeMessage.ALREADY_FOUND, id };
  }

  let message: string;
  let markerMap: string[] = [...marker_map, markers[0].id.toString()];

  message = CodeMessage.NEW_FOUND;
  markerMap = [...marker_map, `${markers[0].id}`];
  hunt.marker_map = markerMap;
  await huntsRepo.save(hunt);
  if (markerMap.length === num_markers && type !== "unified") {
    message = CodeMessage.WIN;
    hunt.completed = true;
    hunt.completed_at = new Date();
    await huntsRepo.save(hunt);
  }
  const { completed } = hunt;
  const unified = hunt.emails.email === "9999" ? true : false;
  return { completed, id, message, markerMap, unified };
};
