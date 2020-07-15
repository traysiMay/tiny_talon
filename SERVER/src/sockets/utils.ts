import { ClueType } from "../entity/Markers";

export const sanitizeInput = (input) => input.replace(/\s/g, "").toLowerCase();
export const getMarkerTypes = (types) => {
  const strongTypes = types
    .trim()
    .toUpperCase()
    .split(",")
    .map((m) => {
      const typed = ClueType[m];
      if (!typed) return null;
      return typed;
    });
  const isNull = strongTypes.find((ele) => ele === null);
  if (isNull === null) {
    return new Error("Clue type invalid");
  } else {
    return strongTypes;
  }
};
