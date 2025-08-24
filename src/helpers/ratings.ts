export const parseToPercentage = (value: string) => {
  if (value.includes("%")) return parseFloat(value.replace("%", ""));
  if (value.includes("/100")) return parseFloat(value.split("/")[0]);
  if (value.includes("/10")) return parseFloat(value.split("/")[0]) * 10;
  return 0;
};
