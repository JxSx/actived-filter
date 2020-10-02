export const isNull = (v) => {
  return v === null || v === undefined;
};
export const isEmpty = (v) => {
  return isNull(v) || v === undefined;
};
