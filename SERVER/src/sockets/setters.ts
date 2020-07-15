import { getRepository } from "typeorm";
import { Series } from "../entity/Series";

export const setSeriesCenter = async (center, seriesId) => {
  const seriesRepo = await getRepository(Series);
  const series = await seriesRepo.findOne(seriesId);
  series.lat = center.lat;
  series.lng = center.lng;
  await seriesRepo.save(series);
  return true;
};
