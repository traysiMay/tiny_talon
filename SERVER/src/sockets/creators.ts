import { Markers } from "../entity/Markers";
import { getRepository } from "typeorm";
import { Series } from "../entity/Series";
import { sanitizeInput, getMarkerTypes } from "./utils";

export const markerCreator = async ({
  markerTypes,
  name,
  hash,
  details,
  lat,
  lng,
  series,
}) => {
  const markerRepo = getRepository(Markers);
  const newMarker = new Markers();
  newMarker.name = name;
  newMarker.hash = sanitizeInput(hash);
  newMarker.description = details;
  newMarker.series = series;
  newMarker.lat = lat;
  newMarker.lng = lng;
  newMarker.type = getMarkerTypes(markerTypes);
  if (newMarker.type instanceof Error) {
    return newMarker.type;
  }
  try {
    await markerRepo.save(newMarker);
  } catch (error) {
    let message;
    if (error.message.includes("duplicate")) {
      message = "DUPLICATE_HASH";
    } else {
      message = error.message;
    }
    return new Error(message);
  }
  // ** inefficient, but whatever?
  const seriesRepo = getRepository(Series);
  const updatedSeries = await seriesRepo.findOne({ id: series });
  const markerCount = await markerRepo
    .createQueryBuilder("markers")
    .leftJoin("markers.series", "series")
    .where("series.id = :series", { series })
    .getCount();
  updatedSeries.num_markers = markerCount;
  await seriesRepo.save(updatedSeries);

  return newMarker;
};
