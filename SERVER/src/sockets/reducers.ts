import { getRepository } from "typeorm";
import { Hunts } from "../entity/Hunts";

export enum CodeMessage {
  NOT_FOUND = "that ain't right",
  ALREADY_FOUND = "you already found this one!",
  NEW_FOUND = "cool find!",
  WIN = "you win!"
}

export const codeReducer = async (code, jwtID) => {
  const huntsRepo = getRepository(Hunts);
  const hunt = await huntsRepo
    .createQueryBuilder("hunts")
    .leftJoinAndSelect("hunts.series", "series")
    .leftJoinAndSelect("series.markers", "markers")
    .leftJoinAndSelect("hunts.emails", "emails")
    .where("markers.hash = :hash", { hash: code })
    .andWhere("emails.id = :eid", { eid: jwtID })
    .getOne();

  if (!hunt) {
    return { message: CodeMessage.NOT_FOUND, id: 0 };
  }

  const {
    series: { id, markers, num_markers },
    marker_map
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

  if (markerMap.length === num_markers) {
    message = CodeMessage.WIN;
    hunt.completed = true;
    await huntsRepo.save(hunt);
  }
  const { completed } = hunt;
  return { completed, id, message, markers, markerMap };
};
